import * as puppeteer from "puppeteer";

import { Configuration, JAMACredentials, ReportContent } from "@model";
import { ConfigurationLoader, JAMACredentialsLoader, PDFSaver, ReportFinder, ReportParser, WorkspaceUtility } from "@utils";
import { ApplicationHeader, DropZone, JAMALogin } from "@widgets";


describe("Generate Report", () =>
{
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    const configuration: Configuration = ConfigurationLoader.load();
    const jamaCredentials: JAMACredentials = JAMACredentialsLoader.load(configuration);

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
            const inputReportContent: ReportContent = ReportParser.execute(inputReport);
            if (inputReportContent)
            {
                it(`Load report for ${inputReportContent.tmsId} (${project.name}) test`, async () =>
                {
                    await page.reload();
                    await DropZone.uploadFile(page, WorkspaceUtility.buildPath(inputReport.filepath));
                    await ApplicationHeader.hideSummary(page);
                });

                if (project.saveAsPDF)
                {
                    it(`Save report for ${inputReportContent.tmsId} (${project.name}) test as PDF`, async () =>
                    {
                        await PDFSaver.execute(page, project, inputReportContent);
                    });
                }

                if (project.uploadToJAMA)
                {
                    it(`Upload results for ${inputReportContent.tmsId} (${project.name}) test to JAMA`, async () =>
                    {
                        await JAMALogin.login(page, jamaCredentials);
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
