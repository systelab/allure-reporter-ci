import * as puppeteer from "puppeteer";


export class HtmlReport
{
    public static async getTitle(page: puppeteer.Page): Promise<string>
    {
        let element = await page.$("h2");
        const title: string = await page.evaluate(el => el.textContent, element);
        const cleanTitle: string = title.replace("/", "-");

        return cleanTitle;
    }
}