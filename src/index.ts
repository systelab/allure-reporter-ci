import * as puppeteer from "puppeteer";

import { Configuration } from "@model";
import { ConfigurationLoader, ReportFinder, PDFSaver } from "@utils";
import { ApplicationHeader, DropZone, HtmlReport } from "@widgets";


describe("Generate Report", () =>
{
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    const configuration: Configuration = ConfigurationLoader.load("test/configuration/configuration1.json"); //needs to be passed as variable when executing the script

    before(async () =>
    {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto(configuration.website, { waitUntil: "networkidle2" });
    });

    for (const project of configuration.projects)
    {
        for (const inputReport of ReportFinder.execute(project))
        {
            it(`Load report file '${inputReport.filepath}'`, async () =>
            {
                await page.reload();
                await DropZone.uploadFile(page, inputReport.filepath);
                await ApplicationHeader.hideSummary(page);
            });

            if (project.saveAsPDF)
            {
                it("Save report as PDF", async () =>
                {
                    const tmsId: string = await HtmlReport.getTitle(page);
                    await PDFSaver.execute(page, project, tmsId);
                });
            }
        }
    }

    after(async () =>
    {
        await browser.close();
    });
})

