export interface Province {
  id?: number;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  provinceName?: string;
  code?: string;
  afterSubmit?: string;
}

export interface ProvinceParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}

export interface departmentDropdown {
  id: number;
  englishName: string;
}
