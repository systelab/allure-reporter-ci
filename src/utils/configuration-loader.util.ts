import { Configuration } from "@model";
import { FilesystemUtility, WorkspaceUtility } from "@utils";


export class ConfigurationLoader
{
    public static load(): Configuration
    {
        const configurationFile = process.env.ALLURE_REPORTER_CI_CONFIG_FILE || "test/configuration/configuration-all.json";
        const configurationFilepath = WorkspaceUtility.buildPath(configurationFile);

        return this.loadFromFilepath(configurationFilepath);
    }

    public static loadFromFilepath(filepath: string): Configuration
    {
        console.log(`Configuration file: ${filepath}`);
        const fileContent = FilesystemUtility.readFile(filepath);

        const configuration: Configuration = JSON.parse(fileContent);
        console.log(`Loaded configuration: ${JSON.stringify(configuration)}`);
        console.log();

        return configuration;
    }
}
