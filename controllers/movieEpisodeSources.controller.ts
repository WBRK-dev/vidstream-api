import { Request, Response } from "express";

import { USER_AGENT_HEADER, ACCEPT_ENCODING_HEADER, ACCEPT_HEADER, SRC_AJAX_URL } from "../config/axois";
import axios from "axios";
import puppeteer from "puppeteer";
import { EpisodeSourcesResponse } from "../types/controllers/movieEpisodeSources";
import { EXECUTABLE_PATH } from "../config/puppeteer";

// GET /movie/:id/sources?episodeId=string&serverId=string
export default async function (req: Request, res: Response) {
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


    let m3u8File: string | null = null;
    let vttFiles: string[] = [];

    const browser = await puppeteer.launch({
        browser: 'firefox',
        executablePath: EXECUTABLE_PATH,
    });

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        Referer: `https://vidstream.to/series/${req.params.id}/${req.query.episodeId}`,
        Origin: "https://vidstream.to",
        "Sec-Fetch-Dest": "iframe",
    });

    page.on('request', (request) => {
        if (request.url().endsWith('.m3u8') && !m3u8File) {
            m3u8File = request.url();
        } else if (request.url().endsWith('.vtt')) {
            vttFiles.push(request.url());
        }
    });

    await page.goto(serverAjaxResponse.data.data.link);
    
    let intervalId: NodeJS.Timeout | null = null;
    await Promise.any([
        new Promise(resolve => setTimeout(resolve, 5000)),
        new Promise<void>(r => intervalId = setInterval(async () => {
            if (m3u8File)
                r();
        }, 200)),
    ]);
    clearInterval(intervalId!);

    await browser.close();

    if (!m3u8File)
        throw new Error("Failed to retrieve m3u8 file");

    res.json({
        sources: [
            {
                src: m3u8File,
                type: "hls",
            },
        ],
        tracks: vttFiles.map(file => ({
            file,
            label: file.split('/').pop()?.split('.')[0] || "Unknown",
            kind: "subtitles",
            default: false,
        })),
    } as EpisodeSourcesResponse);
}
