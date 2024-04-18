export interface ICustomer {
  id?: number;
  name?: string;
  surName?: string;
  fatherName?: string;
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
  location?: string;
  profilePhoto?: File | any;
  afterSubmit?: string;
}

export interface ICustomerParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
