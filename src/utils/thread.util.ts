
export class ThreadUtility
{
    public static async sleep(milliseconds: number): Promise<void>
    {
        return new Promise(res => setTimeout(res, milliseconds));
    }
}
