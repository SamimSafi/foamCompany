export interface IGeneralExpense {
  id?: number;
  name?: string;
  description?: string;
  afterSubmit?:string;
}

export interface IGeneralExpenseParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
