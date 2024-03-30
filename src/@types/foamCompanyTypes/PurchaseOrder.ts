export interface IPurchaseOrder {
  id?: number;
  supplierId?: number;
  orderDate?: Date;
  description?: string;
  afterSubmit?:string;
}

export interface IPurchaseOrderParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
