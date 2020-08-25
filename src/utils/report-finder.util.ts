import { Project, Report } from "@model";

import * as fs from "fs";
import * as path from "path";


export class ReportFinder
{
    public static execute(project: Project): Report[]
    {
        const reports: Report[] = [];
        const inputReportFilepaths = this.getFolderFiles(project.inputFolderPath);
        for (const filepath of inputReportFilepaths)
        {
            const matches = /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}-.*\.(xml|json)/.exec(filepath);
            if (matches)
            {
                reports.push({ filepath: path.join(project.inputFolderPath, filepath) });
            }
        }

        return reports;
    }

    private static getFolderFiles(folderPath: string, recursive = false): string[]
    {
        const files = [];
        if (fs.existsSync(folderPath))
        {
            const folderEntries = fs.readdirSync(folderPath);
            for (const folderEntry of folderEntries)
            {
                const folderEntryPath = `${folderPath}/${folderEntry}`;
                if (fs.lstatSync(folderEntryPath).isDirectory())
                {
                    if (recursive)
                    {
                        const subfolderFiles = this.getFolderFiles(folderEntryPath);
                        const sufolderFilesRelativePaths = subfolderFiles.map((p) => path.join(folderEntry, p) );
                        files.push(...sufolderFilesRelativePaths);
                    }
                }
                else
                {
                    files.push(folderEntry);
                }
            }
        }

        return files;
    }
}
