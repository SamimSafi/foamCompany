export interface IOrder {
  id?: number;
  isWalkingCustomer?: boolean;
  customerId?: number;
  branchId?: number;
  afterSubmit?:string;
}

export interface IOrderParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
