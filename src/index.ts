import * as puppeteer from "puppeteer";
import { AllureDropZone } from "./allure-drop-zone";


describe("Generate Report", () =>
{
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    before(async () =>
    {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto("https://systelab.github.io/allure-reporter/", { waitUntil: "networkidle2" });
    });

    it("Generate report for test 1", async () =>
    {
        await page.reload();
        await AllureDropZone.uploadFile(page, "input/example.xml");
        await page.pdf({ path: 'report/output.pdf', format: "A4" });
    });

    after(async () =>
    {
        await browser.close();
    });
})

