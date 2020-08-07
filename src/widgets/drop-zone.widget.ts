import * as puppeteer from "puppeteer";

export class DropZone
{
    public static async uploadFile(page: puppeteer.Page, filePath: string): Promise<void>
    {
        const fileInputIdentifier = "upload-file-id";
        const dropZoneSelector = ".ngx-file-drop__drop-zone";
        await page.evaluate((fileInputIdentifier, dropZoneSelector) =>
        {
            document.body.appendChild(Object.assign(
                document.createElement("input"),
                {
                    id: fileInputIdentifier,
                    type: "file",
                    onchange: e =>
                    {
                        document.querySelector(dropZoneSelector).dispatchEvent(Object.assign(
                            new Event("drop"),
                            { dataTransfer: { files: e.target.files } }
                        ));
                    }
                }
            ));
        }, fileInputIdentifier, dropZoneSelector);

        const fileInput = await page.$(`#${fileInputIdentifier}`);
        await fileInput.uploadFile(filePath);
        await page.waitFor(1000);

        await page.evaluate((fileInputIdentifier) =>
        {
            const fileInputs = document.querySelectorAll(`#${fileInputIdentifier}`);
            if (fileInputs.length > 0)
            {
                fileInputs[0].parentNode.removeChild(fileInputs[0]);
            }
        }, fileInputIdentifier);
    }
}