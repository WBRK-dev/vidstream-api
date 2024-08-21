import { HomePageResponse } from "../types/controllers/homePage";

import { Request, Response } from "express";
import { SRC_HOME_URL, USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import { extractMovie, extractTvSeries } from "../utils/extractMovieTvSeriesItem";

// GET /home
export default async function (req: Request, res: Response) {
    const response: HomePageResponse = {
        spotlight: [],
        trending: {
            movies: [],
            tvSeries: [],
        },
        latestMovies: [],
        latestTvSeries: [],
    };

    const mainPage = await axios.get(SRC_HOME_URL as string, {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
        },
    });

    const $: CheerioAPI = load(mainPage.data);

    $(".swiper-wrapper .swiper-slide").each((_, el) => {
        let id = $(el).find("a").attr("href")?.split("-") || "";
        id = id[id.length - 1];

        response.spotlight.push({
            id: id as string,
            title: $(el).find(".item-content .movie-name").text(),
            banner: $(el).find("a img").attr("src") as string,
            poster: $(el).find(".item-content img").attr("src") as string,
            rating: $(el).find(".item-content .is-rated")?.text()?.trim(),
            year: $(el).find(".item-content .dot")?.next()?.text()?.trim(),
        });
    });

    $("#trending-movies .item").each((_, el) => {
        response.trending.movies.push(extractMovie($, el));
    });

    $("#trending-series .item").each((_, el) => {
        response.trending.tvSeries.push(extractTvSeries($, el));
    });

    $(".section-row.section-last").each((i, el) => {
        if (i === 0) {
            $(el).find(".item").each((_, el) => {
                response.latestMovies.push(extractMovie($, el));
            });
        } else if (i === 1) {
            $(el).find(".item").each((_, el) => {
                response.latestTvSeries.push(extractTvSeries($, el));
            });
        }
    });

    res.send(response);

}