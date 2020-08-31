import { Configuration } from "@model";
import { FilesystemUtility } from "@utils";


export class ConfigurationLoader
{
    public static load(): Configuration
    {
        const workspace = process.env.ALLURE_REPORTER_CI_WORKSPACE || "";
        const configurationFile = process.env.ALLURE_REPORTER_CI_CONFIG_FILE || "test/configuration/configuration-all.json";
        const configurationFilepath = FilesystemUtility.joinPaths(workspace, configurationFile);

        return this.loadFromFilepath(configurationFilepath);
    }

    public static loadFromFilepath(filepath: string): Configuration
    {
        const fileContent = FilesystemUtility.readFile(filepath);
        return JSON.parse(fileContent);
    }
}
