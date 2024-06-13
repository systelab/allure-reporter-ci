import { Project, Report } from "@model";
import { Console, FilesystemUtility, WorkspaceUtility } from "@utils";


export class ReportFinder
{
    public static execute(project: Project): Report[]
    {
        const projectInputFolder = WorkspaceUtility.buildPath(project.inputFolderPath);
        Console.log(`Searching for Allure reports under '${projectInputFolder}'...`);

        const reports: Report[] = [];
        const inputReportFilepaths: string[] = FilesystemUtility.getFolderFiles(projectInputFolder);
        for (const filePath of inputReportFilepaths)
        {
            if (this.hasFileNameUUID(filePath) && ((FilesystemUtility.isJSONFile(filePath)) || (FilesystemUtility.isXMLFile(filePath))))
            {
                reports.push({ filepath: FilesystemUtility.joinPaths(project.inputFolderPath, filePath) });
            }
        }

        Console.log(`${reports.length} report(s) found.`);
        Console.blankLine();

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
