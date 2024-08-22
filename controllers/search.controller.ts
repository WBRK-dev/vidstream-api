import { Request, Response } from "express";
import { SearchResponse } from "../types/controllers/search";

import { SRC_BASE_URL, USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";
import { extractDetect } from "../utils/extractMovieTvSeriesItem";

// GET /search?q=string&page=number
export default async function (req: Request, res: Response) {
    const response: SearchResponse = {
        items: [],
        pagination: {
            current: parseInt((req.query.page || 1) as string),
            total: 1,
        },
    };

    const serverAjaxResponse = await axios.get(`${SRC_BASE_URL}/search?keyword=${req.query.q}&page=${req.query.page || 1}` as string, {
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

    $(".item").each((_, el) => {
        response.items.push(extractDetect($, el));
    });

    response.pagination.total = parseInt($("ul.pagination .page-item:last-of-type a").attr("href")?.split("page=")[1] || "1");

    res.send(response);
}