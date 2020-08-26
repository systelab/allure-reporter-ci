import { Project, Report } from "@model";

import * as fs from "fs";
import * as path from "path";
import { FilesystemUtility } from "./filesystem.util";


export class ReportFinder
{
    public static execute(project: Project): Report[]
    {
        const reports: Report[] = [];
        const inputReportFilepaths = this.getFolderFiles(project.inputFolderPath);
        for (const filePath of inputReportFilepaths)
        {
            const extension: string = FilesystemUtility.getExtension(filePath);
            if (FilesystemUtility.fileNameHasUUID(filePath) && ((FilesystemUtility.isJSONFile(filePath)) || (FilesystemUtility.isXMLFile(filePath))))
            {
                reports.push({ filepath: path.join(project.inputFolderPath, filePath) });
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
