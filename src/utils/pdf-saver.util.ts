import { Project } from "@model";

import * as fs from "fs";
import * as path from "path"
import * as puppeteer from "puppeteer";


export class PDFSaver
{
    public static async execute(page: puppeteer.Page, project: Project, tmsId: string) : Promise<void>
    {
        if (!fs.existsSync(project.outputFolderPath))
        {
            fs.mkdirSync(project.outputFolderPath);
        }

        const pdfFilepath: string = path.join(project.outputFolderPath, `${tmsId}.pdf`);
        await page.pdf({ path: pdfFilepath, format: "A4" });
    }
}
