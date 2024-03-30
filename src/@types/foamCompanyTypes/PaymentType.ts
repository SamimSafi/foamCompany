export interface IPaymentType {
    id?: number;
    name?: string;
  }
  
  export interface IPaymentTypeParams {
    pageIndex: number;
    pageSize: number;
    name?: string;
  }