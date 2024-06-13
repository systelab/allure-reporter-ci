import * as xml2js from "xml2js";

import { ReportContent, Report } from "@model";
import { FilesystemUtility, WorkspaceUtility } from "@utils";


export class ReportParser
{
    public static async execute(report: Report): Promise<ReportContent>
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

    private static async parseJSON(report: Report): Promise<ReportContent>
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

    private static async parseXML(report: Report): Promise<ReportContent>
    {
        try
        {
            const fileContent: string = this.readReportContent(report);
            const xmlDocument = await xml2js.parseStringPromise(fileContent);

            const titles = xmlDocument['ns2:test-suite'].title;
            const name: string = titles[0];
            const tmsId: string = this.getTmsIdFromXML(xmlDocument);

            return { name, tmsId };
        }
        catch (e)
        {
            return null;
        }
    }

    private static getTmsIdFromXML(xmlDocument): string
    {
        const testCases = xmlDocument['ns2:test-suite']['test-cases'][0];
        const labels = testCases['test-case'][0].labels[0].label;
        for (let i = 0; i < labels.length; i++)
        {
            const labelName: string = labels[i].$.name;
            if (labelName === "tms")
            {
                return labels[i].$.value;
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
