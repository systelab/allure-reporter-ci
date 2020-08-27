import { Project } from "@model";
import { FilesystemUtility } from "@utils";

import * as path from "path";
import * as puppeteer from "puppeteer";


export class PDFSaver
{
    public static async execute(page: puppeteer.Page, project: Project, tmsId: string): Promise<void>
    {
        if (!FilesystemUtility.exists(project.outputFolderPath))
        {
            FilesystemUtility.createFolder(project.outputFolderPath);
        }

        let counter = 2;
        let pdfFilepath: string = path.join(project.outputFolderPath, `${tmsId}.pdf`);
        if (FilesystemUtility.exists(pdfFilepath))
        {
            pdfFilepath = path.join(project.outputFolderPath, `${tmsId}_${counter}.pdf`);
            counter = counter + 1;
        }
        await page.pdf({ path: pdfFilepath, format: "A4" });
    }

    public static cleanOldOutputFiles(outputFolderPath: string)
    {
        if (FilesystemUtility.exists(outputFolderPath))
        {
            FilesystemUtility.deleteFolderContents(outputFolderPath);
        }
    }

}
