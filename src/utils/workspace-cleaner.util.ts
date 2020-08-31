import { Project } from "@model";
import { FilesystemUtility } from "@utils";


export class WorkspaceCleaner
{
    public static cleanOldOutputFiles(project: Project)
    {
        if (FilesystemUtility.exists(project.outputFolderPath))
        {
            FilesystemUtility.deleteFolderContents(project.outputFolderPath);
        }
    }
}
