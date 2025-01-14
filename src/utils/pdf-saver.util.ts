import * as puppeteer from "puppeteer";

import { Project, ReportContent } from "@model";
import { FilesystemUtility, WorkspaceUtility } from "@utils";


export class PDFSaver
{
    public static async execute(page: puppeteer.Page, project: Project, inputReportContent: ReportContent): Promise<string>
    {
        const outputFolderPath = WorkspaceUtility.buildPath(project.outputFolderPath);
        if (!FilesystemUtility.exists(outputFolderPath))
        {
            FilesystemUtility.createFolder(outputFolderPath);
        }

        const pdfFilepath: string = this.getUniquePDFFilepath(outputFolderPath, inputReportContent);

        await page.pdf({ path: pdfFilepath,
                         displayHeaderFooter: true,
                         headerTemplate: this.getPageHeaderTemplate(),
                         footerTemplate: this.getPageFooterTemplate(),
                         format: "A4",
                         preferCSSPageSize: true,
                         margin: {
                            top: 40,
                            bottom: 40,
                            left: 35,
                            right: 35
                         } });

        return pdfFilepath;
    }

    private static getUniquePDFFilepath(folderPath: string, inputReportContent: ReportContent): string
    {
        let filename: string = `${inputReportContent.tmsId}_${inputReportContent.name}`.replace(/[/\\ ]/g, "_");

        const maxFilenameLength = 250;
        if (filename.length > maxFilenameLength) {
            filename = filename.substring(0, maxFilenameLength);
        }

        let counter = 2;
        let pdfFilepath: string = FilesystemUtility.joinPaths(folderPath, `${filename}.pdf`);
        while (FilesystemUtility.exists(pdfFilepath))
        {
            pdfFilepath = FilesystemUtility.joinPaths(folderPath, `${filename}_${counter}.pdf`);
            counter++;
        }

        return pdfFilepath;
    }

    private static getPageHeaderTemplate()
    {
        let headerTemplate =
               "<style>" +
               "    .pageHeader {" +
               "        display: flex;" +
               "        flex-direction: row;" +
               "        align-items: center;" +
               "        justify-content: space-between;" +
               "        width: 450px;" +
               "        height: 15px;" +
               "        margin-left: 30px;" +
               "        margin-right: 30px;" +
               "        font-family: Arial, Helvetica, sans-serif;" +
               "        font-size: 8px;" +
               "    }" +
               "</style>" +
               "<div class='pageHeader'>" +
               "    <div>$$DATE$$</div>" +
               "    <div>Allure Reporter</div>" +
               "</div>";

        headerTemplate = headerTemplate.replace("$$DATE$$", this.getCurrrentDate());

        return headerTemplate;
    }

    private static getPageFooterTemplate()
    {
        return "<style>" +
               "    .pageFooter {" +
               "        display: flex;" +
               "        flex-direction: row;" +
               "        align-items: center;" +
               "        justify-content: space-between;" +
               "        width: 100%;" +
               "        height: 15px;" +
               "        margin-left: 30px;" +
               "        margin-right: 30px;" +
               "        font-family: Arial, Helvetica, sans-serif;" +
               "        font-size: 8px;" +
               "    }" +
               "    .pageNumberBlock {" +
               "        display: flex;" +
               "        flex-direction: row;" +
               "        justify-content: center;" +
               "        align-items: center;" +
               "        font-family: Arial, Helvetica, sans-serif;" +
               "        font-size: 8px;" +
               "    }" +
               "</style>" +
               "<div class='pageFooter'>" +
               "    <div>https://systelab.github.io/allure-reporter/</div>" +
               "    <div class='pageNumberBlock'>" +
               "        <div class='pageNumber'></div>" +
               "        <div>/</div>" +
               "        <div class='totalPages'></div>" +
               "    </div>" +
               "</div>";
    }

    private static getCurrrentDate(): string
    {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const monthIndex = today.getMonth();
        const year = today.getFullYear();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[monthIndex];

        return `${day}-${monthName}-${year}`;
    }
}
