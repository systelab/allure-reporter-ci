import * as puppeteer from "puppeteer";

import { Project, ReportContent } from "@model";
import { FilesystemUtility } from "@utils";


export class PDFSaver
{
    public static async execute(page: puppeteer.Page, project: Project, inputReportContent: ReportContent): Promise<void>
    {
        if (!FilesystemUtility.exists(project.outputFolderPath))
        {
            FilesystemUtility.createFolder(project.outputFolderPath);
        }

        const pdfFilepath: string = this.getUniquePDFFilepath(project.outputFolderPath, inputReportContent);
        await page.pdf({ path: pdfFilepath, format: "A4" });
    }

    private static getUniquePDFFilepath(folderPath: string, inputReportContent: ReportContent): string
    {
        const filename: string = `${inputReportContent.tmsId}_${inputReportContent.name}`.replace(/[/\\ ]/g, "_");

        let counter = 2;
        let pdfFilepath: string = FilesystemUtility.joinPaths(folderPath, `${filename}.pdf`);
        while (FilesystemUtility.exists(pdfFilepath))
        {
            pdfFilepath = FilesystemUtility.joinPaths(folderPath, `${filename}_${counter}.pdf`);
            counter++;
        }

        return pdfFilepath;
    }
}
