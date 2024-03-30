export interface Card {
  id?: number;
  stockId?: number;
  goodId?: number;
  branchId?: number;
  afterSubmit?:string;
}

export interface CardParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
