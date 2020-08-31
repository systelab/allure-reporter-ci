import * as fs from "fs";
import * as path from "path";


export class FilesystemUtility
{
    public static readFile(filePath: string, encoding = null): string
    {
        return fs.readFileSync(filePath, encoding).toString();
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

    public static readFileLines(filepath: string): string[]
    {
        try
        {
            const data: string = this.readFile(filepath, "UTF-8");
            return data.split(/\r?\n/);
        }
        catch (Exception)
        {
            return [];
        }
    }

    public static isJSONFile(filePath: string): boolean
    {
        if (this.getExtension(filePath) === "json")
        {
            return true;
        }

        return false;
    }

    public static isXMLFile(filePath: string): boolean
    {
        if (this.getExtension(filePath) === "xml")
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
            return matches[1].toLowerCase();
        }
    }
}
