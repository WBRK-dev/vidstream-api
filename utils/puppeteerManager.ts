import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export default class {

    private idleTimeoutMilSec: number;
    private maxPages: number;

    private idleTimeout: NodeJS.Timeout | undefined;

    private puppeteer: typeof puppeteer;
    private browser: any;

    constructor(idleTimeout: number = 300000, maxPages: number = 10) {
        this.idleTimeoutMilSec = idleTimeout;
        this.maxPages = maxPages;

        this.puppeteer = puppeteer;
        this.puppeteer.use(StealthPlugin());
    }

    public async getPage() {
        if (!this.browser) {
            this.browser = await this.puppeteer.launch({ headless: true });
        }
        if (await this.browser.pages().length >= this.maxPages) {
            await new Promise<void>((resolve) => {
                const interval = setInterval(async () => {
                    console.log("Waiting for a page to be available");
                    if (await this.browser.pages().length < this.maxPages) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 500);
            });
        }
        this.resetIdleTimeout();
        return await this.browser.newPage();
    }

    public resetIdleTimeout() {
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
        }
        this.idleTimeout = setTimeout(async () => {
            console.log('Idle timeout reached, closing browser');
            this.idleTimeout = undefined;
            await this.browser.close();
            this.browser = undefined;
        }, this.idleTimeoutMilSec);
    }

}