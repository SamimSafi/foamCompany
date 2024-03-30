export interface District {
  id?: number;
  name?: string;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  provinceId?: number;
  code?: string;
  afterSubmit?: string;
  provinceName?: string;
}

export interface DistrictParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
