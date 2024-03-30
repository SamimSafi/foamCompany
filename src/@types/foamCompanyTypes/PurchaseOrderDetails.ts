export interface IPurchaseOrderDetails {
  id?: number;
  goodsId?: number;
  purchaseOrderId?: number;
  quantity?: number;
  afterSubmit?:string;
}

export interface IPurchaseOrderDetailsParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
