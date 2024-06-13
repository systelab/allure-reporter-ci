import * as fs from "fs";
import * as path from "path";


export class FilesystemUtility
{
    public static joinPaths(...paths: string[]): string
    {
        return path.join(...paths);
    }

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

    public static getBasename(filePath: string): string
    {
        return path.basename(filePath);
    }

    public static getExtension(filePath: string): string
    {
        const matches = /\.(\w+)$/.exec(filePath);
        if (matches)
        {
            return matches[1].toLowerCase();
        }
    }

    public static getFolderFiles(folderPath: string, recursive = false): string[]
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
