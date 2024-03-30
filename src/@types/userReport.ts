export interface UserReport {
  departmentId?: number;
  isActive?: boolean;
  isManager?: boolean;
}

export interface UserReportResult {
  id?: string;
  userName?: string;
  email?: string;
  isActive?: boolean;
  departmentId?: number;
  department?: string;
}
