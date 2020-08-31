var DomParser = require('dom-parser');

import { ReportContent, Report } from "@model";
import { FilesystemUtility } from "@utils";


export class ReportParser
{
    public static execute(report: Report): ReportContent
    {
        if (FilesystemUtility.isJSONFile(report.filepath))
        {
            return this.parseJSON(report.filepath);
        }
        else if (FilesystemUtility.isXMLFile(report.filepath))
        {
            return this.parseXML(report.filepath);
        }

        return null;
    }

    private static parseJSON(filepath: string): ReportContent
    {
        const fileContent = FilesystemUtility.readFile(filepath, "UTF8");

        let fileJSON;
        try
        {
            fileJSON = JSON.parse(fileContent);
        }
        catch (e)
        {
            return null;
        }

        if (!fileJSON.name)
        {
            return;
        }

        if (!fileJSON.hasOwnProperty("links") || fileJSON.links.length === 0 || !fileJSON.links[0].hasOwnProperty("name"))
        {
            return;
        }

        return { name: fileJSON.name, tmsId: fileJSON.links[0].name };
    }

    private static parseXML(filepath: string): ReportContent
    {
        try
        {
            const fileContent = FilesystemUtility.readFile(filepath, "UTF8");
            const parser = new DomParser();
            const xmlDoc = parser.parseFromString(fileContent);

            const name: string = xmlDoc.getElementsByTagName("title")[0].childNodes[0].text;
            const tmsId: string = this.getTmsIdFromXML(xmlDoc);

            return { name, tmsId };
        }
        catch (e)
        {
            return null;
        }
    }

    private static getTmsIdFromXML(xmlDoc: Document): string
    {
        const labels = xmlDoc.getElementsByTagName("labels")[0];
        for (let i = 0; i < labels.childNodes.length; i++)
        {
            const labelAttributes = (labels as any).childNodes[i].attributes;
            if (labelAttributes.length === 2)
            {
                if (labelAttributes[0].name === "name" && labelAttributes[0].value === "tms")
                {
                    return labelAttributes[1].value;
                }
            }
        }

        return null;
    }
}
