import { Request, Response } from "express";
import { EpisodeServerResponse } from "../types/controllers/movieEpisodeSources";
import { SERVERS } from "../config/vidstream";

import { USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL } from "../config/axois";
import axios from "axios";
import {
    RabbitStream
} from "../parsers/index";

// GET /movie/:id/sources?episodeId=string&serverId=string
export default async function (req: any, res: Response) {
    const serverAjaxResponse = await axios.get(`${SRC_AJAX_URL}/movie/episode/server/sources/${req.query.serverId}` as string, {
        headers: {
            "Alt-Used": "vidstream.to",
            "Host": "vidstream.to",
            "Referer": `https://vidstream.to/series/${req.params.id}/${req.query.episodeId}`,
            "User-Agent": USER_AGENT_HEADER,
            "Accept-Encoding": ACCEPT_ENCODING_HEADER,
            Accept: ACCEPT_HEADER,
        },
    });

    res.send(await RabbitStream(serverAjaxResponse.data.data.link, "https://vidstream.to"));
}
