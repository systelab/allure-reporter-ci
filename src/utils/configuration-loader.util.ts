import { Configuration } from "@model";

import * as fs from "fs";


export class ConfigurationLoader
{
    public static load(): Configuration
    {
        const filepath = process.env.ALLURE_REPORTER_CI_CONFIGURATION || "test/configuration/configuration-all.json";
        return this.loadFromFilepath(filepath);
    }

    public static loadFromFilepath(filepath: string): Configuration
    {
        const fileContent = fs.readFileSync(filepath).toString();
        return JSON.parse(fileContent);
    }
}
