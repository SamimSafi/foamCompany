export interface ISupplier {
  id?: number;
  name?: string;
  surName?: string;
  englishFirstName?: string;
  pashtoFirstName?: string;
  englishSurName?: string;
  pashtoSurName?: string;
  englishFatherName?: string;
  pashtoFatherName?: string;
  englishGrandFatherName?: string;
  pashtoGrandFatherName?: string;
  phone?: string;
  email?: string;
  branchId?: number;
  location?: string;
  profilePhoto?: File | any;
  afterSubmit?: string;
}

export interface ISupplierParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
