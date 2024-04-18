export interface IPositionTitle {
  id?: number;
  name?: string;
  dariName?: string;
  englishName?: string;
  pashtoName?: string;
  code?: string;
  isActive?: boolean;
  branchId?: number;
  branchName?: string;
}

export interface IPositionTitleParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
