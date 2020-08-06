
export class AllureDropZone
{
    public static async uploadFile(page, filePath: string): Promise<void>
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
    }
}