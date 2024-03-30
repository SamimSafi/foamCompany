
export interface ExternalDocumentDashboardByLoggedInUser{
    structureName:string[];
    value:number;
    groupBy:string;
    data:data[];
}

export interface InternalDocumentDashboardByLoggedInUser{
    structureName:string[];
    value:number;
    groupBy:string;
    data:data[];
}

export interface ArchiveDataEntryByLoggedUserAndDocument{
    totalCategoryCount:number;
    totalValueSum:number;
    data:dataCount[];
}

export interface dataCount
{
    label:string;
    value:number;

}

export interface data
{
    name:string;
    data:number[];

}
