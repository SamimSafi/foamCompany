export interface IContractType {
  id?: number;
  name?: string;
  englishName: string;
  pashtoName: string;
  dariName: string;
  code: string;
  afterSubmit?: string;
}

export interface IContractTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
