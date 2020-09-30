import { Configuration, JAMACredentials } from "@model";


export class JAMACredentialsLoader
{
    public static load(configuration: Configuration): JAMACredentials
    {
        const username = process.env.ALLURE_REPORTER_CI_JAMA_USERNAME || "MyUsername";
        const password = process.env.ALLURE_REPORTER_CI_JAMA_PASSWORD || "MyPassword";

        return {
            server: configuration.jamaUrl,
            username,
            password
        };
    }
}
