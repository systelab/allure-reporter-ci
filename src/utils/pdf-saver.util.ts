import { Project } from "@model";
import { FilesystemUtility } from "@utils";

import * as path from "path";
import * as puppeteer from "puppeteer";


export class PDFSaver
{
    public static async execute(page: puppeteer.Page, project: Project, filename: string): Promise<void>
    {
        if (!FilesystemUtility.exists(project.outputFolderPath))
        {
            FilesystemUtility.createFolder(project.outputFolderPath);
        }

        const pdfFilepath: string = this.getUniquePDFFilepath(project.outputFolderPath, filename);
        await page.pdf({ path: pdfFilepath, format: "A4" });
    }

    public static cleanOldOutputFiles(outputFolderPath: string)
    {
        if (FilesystemUtility.exists(outputFolderPath))
        {
            FilesystemUtility.deleteFolderContents(outputFolderPath);
        }
    }

    private static getUniquePDFFilepath(folderPath: string, filename: string): string
    {
        let counter = 2;
        let pdfFilepath: string = path.join(folderPath, `${filename}.pdf`);
        while (FilesystemUtility.exists(pdfFilepath))
        {
            pdfFilepath = path.join(folderPath, `${filename}_${counter}.pdf`);
            counter++;
        }

        return pdfFilepath;
    }

}
