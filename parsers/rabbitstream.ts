import PuppeteerManager from "../utils/puppeteerManager";

/**
 * Thanks to https://github.com/redabacha/rabbitstream-v2-reverse-engineering
 * for reverse engineering the rabbitstream infrastructure.
 * And a big thanks to the codebase https://github.com/cool-dev-guy/rabbitthunder
 * for helping me build this parser.
 */

export default async function (PuppeteerManager: PuppeteerManager, iframeLink: string) {
    const id = (new URL(iframeLink)).pathname.split('/').pop();

    const response: any = {
        sources: [],
        tracks: []
    };

    const page = await PuppeteerManager.getPage();

    await page.setRequestInterception(true);
    await page.setExtraHTTPHeaders({ 'Referer': 'https://flixhq.to/' });

    page.on('request', async (interceptedRequest) => {
        await (async () => {
            if (interceptedRequest.url().includes('.m3u8')) response.sources.push({ src: interceptedRequest.url(), type: "hls"});
            interceptedRequest.continue();
        })();
    });

    page.on('response', async (interceptedResponse) => {
        await (async () => {
            if (interceptedResponse.url().includes('https://rabbitstream.net/ajax/v2/embed-4/getSources')) response.tracks = (await interceptedResponse.json()).tracks;
        })();
    });

    await Promise.all([
        page.waitForRequest(req => req.url().includes('.m3u8'), { timeout: 20000 }),
        page.goto(`https://rabbitstream.net/v2/embed-4/${id}?z=&_debug=true`, { waitUntil: 'domcontentloaded' }),
    ]);

    await page.close();

    return response;
}