export interface IContractDetails {
  id?: number;
  employeeProfileId?: number;
  contractTypeId?: number;
  positionTitleId?: number;
  branchId?: number;
  salaryPerHour?: number;
  startDate?: Date;
  endDate?: Date;
  isCurrent?: boolean;
  remarks?: string;
  branch?: string;
  contractType?: string;
  employeeName?: string;
  afterSubmit?: string;
  positionTitleName?: string;
}

export interface IContractDetailsParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}
