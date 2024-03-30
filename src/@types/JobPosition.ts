export interface IJobPosition {
  id?: number;
  englishName?: string;
  dariName?: string;
  pashtoName?: string;
  code?: string;
}

export interface IJobPositionParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
