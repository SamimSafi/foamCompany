export interface IExpenseType {
  id?: number;
  name?: string;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  afterSubmit?: string;
}

export interface IExpenseTypeParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
