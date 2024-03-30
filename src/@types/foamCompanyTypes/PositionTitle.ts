export interface IPositionTitle {
  id?: number;
  name?: string;
  branchId?: number;
  branchName?: string;
}

export interface IPositionTitleParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
