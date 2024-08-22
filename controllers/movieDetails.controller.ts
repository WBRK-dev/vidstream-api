import { Request, Response } from "express";
import { MovieDetailsResponse } from "../types/controllers/movieDetails";

import { USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL, SRC_BASE_URL } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import { extractDetect } from "../utils/extractMovieTvSeriesItem";

// GET /movie/:id
export default async function (req: Request, res: Response) {
    const response: MovieDetailsResponse = {
        title: "",
        description: "",
        type: "",
        stats: [],
        related: [],
    };

    const axiosResponse = await axios.get(`${SRC_BASE_URL}/watch-movie/watch-${req.params.id}` as string, {
        headers: {
            "Alt-Used": "vidstream.to",
            "Host": "vidstream.to",
            "Referer": `https://vidstream.to/watch-movie/watch-${req.params.id}`,
            "User-Agent": USER_AGENT_HEADER,
            "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            Accept: ACCEPT_HEADER,
        },
    });

    const $: CheerioAPI = load(axiosResponse.data);

    response.title = $(".movie-detail h3.movie-name").text();
    response.description = $(".movie-detail .is-description .dropdown-menu .dropdown-text").text().trim();

    $(".movie-detail .is-sub > div").each((_, el) => {
        const stat: any = {
            name: $(el).find(".name").text(),
            value: []
        };

        const anchorTags = $(el).find(".value a");
        if (anchorTags.length) {
            anchorTags.each((_, anchor) => {
                stat.value.push($(anchor).text());
            });
        } else {
            stat.value = $(el).find(".value").text().trim();
        }
        

        response.stats.push(stat);
    });

    $(".section-related .item").each((_, el) => {

        console.log(_);
        

        response.related.push(extractDetect($, el));

    });

    const axiosResponseLines = axiosResponse.data.split("\n");
    for (let i = axiosResponseLines.length - 1; i > 0; i--) {
        if (axiosResponseLines[i].includes("const movie = {")) {
            response.type = (axiosResponseLines[i + 2].includes("type: '1'")) ? "movie" : "tvSeries";
            if (response.type === "movie") response.episodeId = axiosResponseLines[i + 4].split("'")[1];
        }
    }

    res.send(response);
}