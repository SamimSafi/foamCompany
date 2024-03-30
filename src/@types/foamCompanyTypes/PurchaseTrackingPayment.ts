export interface IPurchaseTrackingPayment {
  id?: number;
  purchaseOrderId?: number;
  paymentTypeId?: number;
  orderDate?: Date;
  paid?: number;
  discount?: number;
  paymentMethodId?: number;
  installmentCount?: number;
  accountNumber?: number;
  approvedBy?: string;
  branchId?: number;
  isCompletelyPaid?: number;
  afterSubmit?:string;
}

export interface IPurchaseTrackingPaymentParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
