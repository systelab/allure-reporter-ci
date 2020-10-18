import * as puppeteer from "puppeteer";

import { JAMACredentials } from "@model";
import { ApplicationHeader } from "./app-header.widget";


export class JAMALogin
{
    public static async login(page: puppeteer.Page, credentials: JAMACredentials): Promise<void>
    {
        await ApplicationHeader.showLogin(page);
        await page.type("#username", credentials.username);
        await page.type("#password", credentials.password);
        await page.type("#server", credentials.server);
    }
}
