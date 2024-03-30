export interface AttendanceReport {
  employeeID?: number;
  fromDate: Date | null;
  toDate?: Date | null;
}

export interface AttendanceReportResult {
  DateValue: string;
  DateShami: string;
  DayValue: string;
  AttResult: string;
  Intime: string;
  Outtime: string;
  absentOnly: string;
  holiday: string;
}

export interface EmployeeDetail {
  ID: string;
  IDCard: string;
  Name: string;
  Job: string;
  Position: string;
  Department: string;
  Shift: string;
}

export interface EmployeeLeaveDetails {
  ID: number;
  LeaveTypeName: string;
  AllowLeaveDay: string;
  TakenDays: string;
  Balance: string;
}
