export interface IExpenseType {
  id?: number;
  name?: string;
  description?: string;
  afterSubmit?:string;
}

export interface IExpenseTypeParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
