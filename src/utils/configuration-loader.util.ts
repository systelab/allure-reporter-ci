import { Configuration } from "@model";
import { FilesystemUtility } from "@utils";


export class ConfigurationLoader
{
    public static load(): Configuration
    {
        const workspace = process.env.ALLURE_REPORTER_CI_WORKSPACE || "";
        const filepath = process.env.ALLURE_REPORTER_CI_CONFIGURATION || "test/configuration/configuration-all.json";
        const fullFilepath = FilesystemUtility.joinPaths(workspace, filepath);

        return this.loadFromFilepath(fullFilepath);
    }

    public static loadFromFilepath(filepath: string): Configuration
    {
        const fileContent = FilesystemUtility.readFile(filepath);
        return JSON.parse(fileContent);
    }
}
