export interface IGetActiveEmployee {
  id?: number;
  contractId?: number;
  employeeProfileId?: number;
  pageIndex: number;
  pageSize: number;
  employeeFullName?: string;
  employeePosition?: string;
}
