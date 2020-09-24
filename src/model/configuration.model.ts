
export interface Configuration
{
    website: string;
    jamaUrl: string;
    projects: Project[];
}

export interface Project
{
    name: string;
    inputFolderPath: string;
    outputFolderPath: string;
    saveAsPDF: boolean;
    uploadToJAMA: boolean;
    jamaProject?: JAMAProject;
}

export interface JAMAProject
{
    name: string;
    testPlan: string;
    testCycle: string;
    testGroup: string;
}
