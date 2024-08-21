import { Request, Response } from "express";
import { Episode } from "../types/controllers/movieEpisodes";

import { SRC_HOME_URL, USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";

// GET /movie/:id/episodes?seasonId=string
export default async function (req: Request, res: Response) {
    const response: Episode[] = [];

    const serverAjaxResponse = await axios.get(`${SRC_AJAX_URL}/movie/season/episodes/${req.query.seasonId}` as string, {
        headers: {
            "Alt-Used": "vidstream.to",
            "Host": "vidstream.to",
            "Referer": `https://vidstream.to/series/${req.params.id}`,
            "User-Agent": USER_AGENT_HEADER,
            "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            Accept: ACCEPT_HEADER,
        },
    });

    let $: CheerioAPI = load(serverAjaxResponse.data);

    $(".item a").each((_, el) => {
        response.push({
            id: $(el).attr("data-id") as string,
            number: parseInt($(el).find("strong").text().trim().split(" ")[1]),
            title: $(el).text().trim().split(" ").slice(2).join(" "),
        });
    });

    res.send(response);
}