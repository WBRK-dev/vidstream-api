import { Request, Response } from "express";

// GET /proxy/vtt?url=string
export default async function (req: Request, res: Response) {
    const url = req.query.url as string;
    if (!url) {
        res.status(400).send('Missing URL parameter');
        return;
    }

    const Url = new URL(url);

    const response = await fetch(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
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

    console.log(`[HLS PROXY] [VTT] [${response.status}]: ${Url.host}`);

	const safeHeaders = ['content-type', 'access-control-allow-origin', 'cache-control', 'expires'];
    for (const [key, value] of response.headers.entries()) {
        if (safeHeaders.includes(key.toLowerCase())) {
            res.setHeader(key, value);
        }
    }
    res.setHeader('access-control-allow-origin', '*');

    res.send(await response.text());
}