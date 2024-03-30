export interface IPayment {
  id?: number;
  orderId?: number;
  paymentTypeId?: number;
  PaymentMethodId?: number;
  discount?: string;
  paid?: string;
  isCompletelyPaid?: boolean;
  installmentCount?: number;
  accountNumber?: number;
  approvedBy?:string;
  branchId?: number;
  paymentDate?: Date;
  afterSubmit?:string;
}

export interface IPaymentParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
