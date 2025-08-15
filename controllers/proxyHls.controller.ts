import { Request, Response } from "express";
import { URL as EnvURL } from "../config/server";

// GET /proxy/hls?url=string
export default async function (req: Request, res: Response) {
    const url = req.query.url as string;
    if (!url) {
        res.status(400).send('Missing URL parameter');
        return;
    }

    if (url.endsWith('.m3u8'))
        await m3u8(url, req, res);
    else
        await handleResourceRequest(url, res, res);
}

async function m3u8(url: string, req: Request, res: Response) {
    const Url = new URL(url);

    const response = await fetch(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'connection': 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'referer': 'https://streameeeeee.site/',
            'origin': 'https://streameeeeee.site',
            'host': Url.host,
        }
    });

    console.log(`[HLS PROXY] [M3U8] [${response.status}]: ${Url.host} - ${url}`);

    const body = await response.text();

    const bodySplit = body.split("\n");
    let responseBody = '';
    bodySplit.forEach(line => {
        const fileName = Buffer.from(line.split('/').pop()!, 'base64').toString('utf-8');
        if (line.startsWith("http://") || line.startsWith("https://")) {
            line = `${EnvURL}/proxy/hls/?url=${encodeURIComponent(line)}&filename=${encodeURIComponent(fileName)}`;
        } else if (line && !line.startsWith("#")) {
            const absUrl = new URL(line, url).toString();
            line = `${EnvURL}/proxy/hls/?url=${encodeURIComponent(absUrl)}&filename=${encodeURIComponent(fileName)}`;
        }
        responseBody += line + "\n";
    });

    for (const [key, value] of response.headers.entries()) {
        res.setHeader(key, value);
    }
    res.setHeader('access-control-allow-origin', '*');
    res.setHeader('content-type', 'application/X-mpegURL');

    res.send(responseBody);
}

async function handleResourceRequest(url, req, res) {
    const Url = new URL(url);

    const response = await fetch(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'connection': 'keep-alive',
            'upgrade-insecure-requests': '1',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'referer': 'https://streameeeeee.site/',
            'origin': 'https://streameeeeee.site',
            'host': Url.host,
        }
    });

    console.log(`[HLS PROXY] [VIDEO SEGMENT] [${response.status}]: ${Url.host}`);

    if (!response.ok) {
        res.status(response.status).send();
        return;
    }

    const safeHeaders = ['content-type', 'access-control-allow-origin', 'cache-control', 'expires'];
    for (const [key, value] of response.headers.entries()) {
        if (safeHeaders.includes(key.toLowerCase())) {
            res.setHeader(key, value);
        }
    }
    res.setHeader('access-control-allow-origin', '*');

    const responseBody = await response.arrayBuffer();
    res.send(Buffer.from(responseBody));
    res.end();
}
