import * as puppeteer from "puppeteer";

import { Configuration } from "@model";
import { ConfigurationLoader, ReportFinder, PDFSaver, ReportParser, WorkspaceUtility } from "@utils";
import { ApplicationHeader, DropZone } from "@widgets";


describe("Generate Report", () =>
{
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    const configuration: Configuration = ConfigurationLoader.load();

    before(async () =>
    {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto(configuration.website, { waitUntil: "networkidle2" });
    });

    for (const project of configuration.projects)
    {
        WorkspaceUtility.cleanOldOutputFiles(project);

        for (const inputReport of ReportFinder.execute(project))
        {
            const inputReportContent = ReportParser.execute(inputReport);
            if (inputReportContent)
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
                        await PDFSaver.execute(page, project, inputReportContent);
                    });
                }
            }
        }
    }

    after(async () =>
    {
        await browser.close();
    });
});
