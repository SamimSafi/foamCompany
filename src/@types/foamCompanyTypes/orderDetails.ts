export interface IOrderDetails {
  id?: number;
  orderId?: number;
  goodsId?: number;
  quantity?: number;
  afterSubmit?:string;
}

export interface IOrderParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
