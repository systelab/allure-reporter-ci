import * as puppeteer from "puppeteer";


export class ApplicationHeader
{
    public static async hideSummary(page: puppeteer.Page): Promise<void>
    {
        await page.click("app-navbar button .fa-table");
    }

    public static async showLogin(page: puppeteer.Page): Promise<void>
    {
        await page.click("app-navbar button .fa-user");
    }
}
