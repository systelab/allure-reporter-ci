
export interface Configuration
{
    website: string;
    projects: Project[];
}

export interface Project
{
    name: string;
    inputFolderPath: string;
    outputFolderPath: string;
    saveAsPDF: boolean;
    uploadToJAMA: boolean;
}
