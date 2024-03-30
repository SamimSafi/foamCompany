export interface IPaymentMethod {
    id?: number;
    name?: string;
    description?: string;
  }
  
  export interface IPaymentMethodParams {
    pageIndex: number;
    pageSize: number;
    name?: string;
  }