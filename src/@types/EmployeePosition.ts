export interface IEmployeePosition {
  id?: number;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  code?: string;
}

export interface IEmployeePositionParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
