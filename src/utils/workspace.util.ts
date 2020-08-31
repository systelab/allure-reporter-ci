import { Project } from "@model";
import { FilesystemUtility } from "@utils";


export class WorkspaceUtility
{
    public static buildPath(relativePath: string)
    {
        const workspaceRootPath = process.env.ALLURE_REPORTER_CI_WORKSPACE || "";
        return FilesystemUtility.joinPaths(workspaceRootPath, relativePath);
    }

    public static cleanOldOutputFiles(project: Project)
    {
        if (FilesystemUtility.exists(project.outputFolderPath))
        {
            FilesystemUtility.deleteFolderContents(project.outputFolderPath);
        }
    }
}
