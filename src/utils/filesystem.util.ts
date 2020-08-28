import * as fs from "fs";
import * as path from "path";


export class FilesystemUtility
{
    public static readFile(filePath: string, encoding = null): string
    {
        return fs.readFileSync(filePath, encoding).toString();
    }

    public static getTestNameFromFileReport(filePath: string): string
    {
        if (FilesystemUtility.fileNameHasUUID(filePath))
        {
            if (FilesystemUtility.isJSONFile(filePath))
            {
                const fileContent = this.readFile(filePath, "UTF8");
                const fileJSON = JSON.parse(fileContent);
                if (fileJSON.hasOwnProperty("links") && fileJSON.links.length > 0 && fileJSON.links[0].hasOwnProperty("name"))
                {
                    return fileJSON.links[0].name;
                }
            }
            else if (FilesystemUtility.isXMLFile(filePath))
            {
                const lines: string[] = this.readFileLines(filePath);
                for (const line of lines)
                {
                    const matches = /(?:<label name='tms' value=')(.+)(?:')/.exec(line);
                    if (matches)
                    {
                        return matches[1];
                    }
                }
            }
        }
        return "unknown";
    }

    public static exists(filesystemPath: string): boolean
    {
        return fs.existsSync(filesystemPath);
    }

    public static createFolder(filesystemPath: string)
    {
        fs.mkdirSync(filesystemPath, { recursive: true });
    }

    public static deleteFolderContents(folderPath: string): void
    {
        if (this.exists(folderPath))
        {
            fs.readdirSync(folderPath).forEach((folderEntry) =>
            {
                const filepath = path.join(folderPath, folderEntry);
                if (fs.lstatSync(filepath).isDirectory())
                {
                    this.deleteFolderContents(filepath);
                    fs.rmdirSync(filepath);
                }
                else
                {
                    this.deleteFile(filepath);
                }
            });
        }
    }

    public static deleteFile(filepath: string): void
    {
        fs.unlinkSync(filepath);
    }

    private static readFileLines(filepath: string): string[]
    {
        try
        {
            const data: string = FilesystemUtility.readFile(filepath, "UTF-8");
            return data.split(/\r?\n/);
        }
        catch (Exception)
        {
            return [];
        }
    }

    public static fileNameHasUUID(filePath: string): boolean
    {
        const match = /([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}.+)\./.exec(filePath);
        if (match)
        {
            return true;
        }
        return false;
    }

    public static getExtension(filePath: string): string
    {
        const matches = /\.(\w+)$/.exec(filePath);
        if (matches)
        {
            return matches[1];
        }
    }

    public static isJSONFile(filePath: string): boolean
    {
        if (FilesystemUtility.getExtension(filePath) === "json")
        {
            return true;
        }

        return false;
    }

    public static isXMLFile(filePath: string): boolean
    {
        if (FilesystemUtility.getExtension(filePath) === "xml")
        {
            return true;
        }

        return false;
    }

}
