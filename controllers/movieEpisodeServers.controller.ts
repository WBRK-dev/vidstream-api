import { Request, Response } from "express";
import { Server } from "../types/controllers/movieEpisodeServers";
import { ALLOWED_EPISODE_SERVERS } from "../config/vidstream";

import { USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL } from "../config/axois";
import axios from "axios";
import { load, CheerioAPI } from "cheerio";

// GET /movie/:id/servers?episodeId=string
export default async function (req: Request, res: Response) {
    const response: Server[] = [];

    const serverAjaxResponse = await axios.get(`${SRC_AJAX_URL}/movie/episode/servers/${req.query.episodeId}` as string, {
        headers: {
            "Alt-Used": "vidstream.to",
            "Host": "vidstream.to",
            "Referer": `https://vidstream.to/series/${req.params.id}/${req.query.episodeId}`,
            "User-Agent": USER_AGENT_HEADER,
            "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            Accept: ACCEPT_HEADER,
        },
    });

    const $: CheerioAPI = load(serverAjaxResponse.data);

    $(".dropdown-menu .dropdown-item").each((_, el) => {
        if (ALLOWED_EPISODE_SERVERS.filter(obj => obj === $(el).text().trim().toLowerCase())?.length === 0) return;
        response.push({
            id: $(el).attr("data-id") as string,
            name: $(el).text().trim(),
        });
    });

    res.send(response);
}