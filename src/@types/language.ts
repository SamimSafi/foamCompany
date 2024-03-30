// Interface for Document type (Related to Dab)
export interface ILanguage {
  id?: number;
  name: string;
  afterSubmit?:string;
}
// Pagination
export interface ILanguageParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}


