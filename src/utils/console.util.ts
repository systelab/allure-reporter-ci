import * as colors from "colors";


export class Console {
    private static indentationLevel = 0;

    public static addIndentation(levels = 1): void
    {
        this.indentationLevel+=levels;
    }

    public static removeIndentation(levels = 1): void
    {
        this.indentationLevel-=levels;
    }

    public static blankLine(count = 1): void
    {
        for (let i = 0; i < count; i++)
        {
            console.log("");
        }
    }

    public static log(data: string): void
    {
        console.log(colors.white(`${this.getIndentationPrefix()}${data}`));
    }

    public static info(data: string): void
    {
        console.log(colors.gray(`${this.getIndentationPrefix()}${data}`));
    }

    public static header(data: string): void
    {
        console.log(colors.magenta(`${this.getIndentationPrefix()}${data}`));
    }

    public static success(data: string): void
    {
        console.log(colors.green(`${this.getIndentationPrefix()}${data}`));
    }

    public static warn(data: string): void
    {
        console.log(colors.yellow(`${this.getIndentationPrefix()}${data}`));
    }
º
    public static error(data: string): void
    {
        console.log(colors.red(`${this.getIndentationPrefix()}${data}`));
    }

    private static getIndentationPrefix(): string
    {
        return " ".repeat(this.indentationLevel * 2);
    }
}
