export interface IStock {
  id?: number;
  name?: string;
  description?: string;
  afterSubmit?:string;
}

export interface IStockParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
