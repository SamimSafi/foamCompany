export interface ISupplier {
  id?: number;
  name?: string;
  fatherName?: string;
  phone?: string;
  email?: string;
  branchId?: number;
  location?: string;
  afterSubmit?:string;
}

export interface ISupplierParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
