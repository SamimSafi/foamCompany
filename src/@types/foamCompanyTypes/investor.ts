export interface IInvestor {
  id?: number;
  employeeId?: number;
  percentOfInvest?: string;
  employeeName?: string;
  startDate?: Date;
  endDate?: Date;
  afterSubmit?:string;
}

export interface IInvestorParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
