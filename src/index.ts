import * as puppeteer from "puppeteer";

import { Configuration, ReportContent } from "@model";
import { ConfigurationLoader, Console, FilesystemUtility, ReportFinder, PDFSaver, ReportParser, ThreadUtility, WorkspaceUtility } from "@utils";
import { ApplicationHeader, DropZone } from "@widgets";



describe("Allure Reports Processing", () =>
{
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;
    const configuration: Configuration = ConfigurationLoader.load();

    before(async () =>
    {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });
        page = await browser.newPage();
        await page.goto(configuration.website); // { waitUntil: 'networkidle2' });
        await ThreadUtility.sleep(3000);
    });

    it("Creation of PDF files with Allure reports", async () =>
    {
        Console.blankLine();
        Console.addIndentation(2);

        for (const project of configuration.projects)
        {
            Console.header(`${project.name}`);
            Console.addIndentation();
            WorkspaceUtility.cleanOldOutputFiles(project);

            for (const inputReport of ReportFinder.execute(project))
            {
                Console.log(`Processing report file '${FilesystemUtility.getBasename(inputReport.filepath)}'...`);
                Console.addIndentation();

                const inputReportContent: ReportContent = await ReportParser.execute(inputReport);
                if (inputReportContent)
                {
                    Console.info(`${inputReportContent.tmsId} - ${inputReportContent.name}`);
                    await page.reload();
                    await DropZone.uploadFile(page, WorkspaceUtility.buildPath(inputReport.filepath));
                    await ApplicationHeader.hideSummary(page);

                    if (project.saveAsPDF)
                    {
                        await PDFSaver.execute(page, project, inputReportContent);
                        Console.info("Generated report PDF file");
                    }
                }
                else
                {
                    Console.error("Error parsing report file");
                }

                Console.blankLine();
                Console.removeIndentation();
            }

            Console.blankLine();
        }

        Console.removeIndentation(2);
    });

    after(async () =>
    {
        await browser.close();
    });
});
