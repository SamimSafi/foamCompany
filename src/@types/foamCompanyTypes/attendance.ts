export interface IAttendance {
  id?: number;
  employeeId?: number;
  date?: Date;
  signInTime?: Date;
  signOutTime?: Date;
  afterSubmit?:string;
}

export interface IAttendanceParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
