import * as path from "path";

import { Project, Report } from "@model";
import { FilesystemUtility } from "@utils";


export class ReportFinder
{
    public static execute(project: Project): Report[]
    {
        const reports: Report[] = [];
        const inputReportFilepaths = FilesystemUtility.getFolderFiles(project.inputFolderPath);
        for (const filePath of inputReportFilepaths)
        {
            if (this.hasFileNameUUID(filePath) && ((FilesystemUtility.isJSONFile(filePath)) || (FilesystemUtility.isXMLFile(filePath))))
            {
                reports.push({ filepath: FilesystemUtility.joinPaths(project.inputFolderPath, filePath) });
            }
        }

        return reports;
    }

    private static hasFileNameUUID(filePath: string): boolean
    {
        const match = /([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}.+)\./.exec(filePath);
        if (match)
        {
            return true;
        }
        return false;
    }
}
