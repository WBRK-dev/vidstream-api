import { Request, Response } from "express";
import { Episode, Season } from "../types/controllers/movieEpisodes";

import { SRC_HOME_URL, USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";

// GET /movie/:id/seasons
export default async function (req: Request, res: Response) {
    const response: Season[] = [];

    const serverAjaxResponse = await axios.get(`${SRC_AJAX_URL}/movie/seasons/${req.params.id}` as string, {
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

    $(".dropdown-menu .dropdown-item").each((_, el) => {
        response.push({
            id: $(el).attr("data-id") as string,
            number: parseInt($(el).text().split(" ")[1]),
        });
    });

    res.send(response);
}