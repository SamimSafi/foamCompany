export interface IBranch {
  id?: number;
  name?: string;
  location?: string;
  description?: string;
  afterSubmit?:string;
}

export interface IBranchParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
