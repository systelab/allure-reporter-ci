import { Configuration } from "@model";

import * as fs from "fs";


export class ConfigurationLoader
{
    public static load(filepath: string): Configuration
    {
        const fileContent = fs.readFileSync(filepath).toString();
        return JSON.parse(fileContent);
    }
}
