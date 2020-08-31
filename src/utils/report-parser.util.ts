import * as DomParser from "dom-parser";

import { ReportContent, Report } from "@model";
import { FilesystemUtility, WorkspaceUtility } from "@utils";


export class ReportParser
{
    public static execute(report: Report): ReportContent
    {
        if (FilesystemUtility.isJSONFile(report.filepath))
        {
            return this.parseJSON(report);
        }
        else if (FilesystemUtility.isXMLFile(report.filepath))
        {
            return this.parseXML(report);
        }

        return null;
    }

    private static parseJSON(report: Report): ReportContent
    {
        try
        {
            const fileContent = this.readReportContent(report);
            const jsonDocument = JSON.parse(fileContent);

            const name: string = jsonDocument.name;
            const tmsId: string = jsonDocument.links[0].name;
            if (!name || !tmsId)
            {
                return null;
            }

            return { name, tmsId };
        }
        catch (e)
        {
            return null;
        }
    }

    private static parseXML(report: Report): ReportContent
    {
        try
        {
            const fileContent = this.readReportContent(report);
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

    private static readReportContent(report: Report): string
    {
        const reportFilepath = WorkspaceUtility.buildPath(report.filepath);
        return FilesystemUtility.readFile(reportFilepath, "UTF8");
    }
}
