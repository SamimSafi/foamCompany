export interface ICustomer {
  id?: number;
  name?: string;
  lastName?: string;
  fatherName?: string;
  phone?: string;
  email?: string;
  branchId?: number;
  location?: string;
  afterSubmit?:string;
}

export interface ICustomerParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
