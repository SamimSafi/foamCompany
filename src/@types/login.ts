export interface LoginFormValue {
  userName: string;
  password: string;
  rememberMe?: boolean;
  afterSubmit?: string;
}

export interface SendVerificationCode {
  email: string;
}

export interface VerifyVerificationCode {
  email: any;
  verificationCode: any;
}


export interface VerificationCodeResponse {

  code: any;
  message: any;
  data: any;
}


export interface ResetPassword {
  id: any;
  email: any;
  verificationCode: string;

  newPassword: string;
}

export interface User {
  ID: string;
  UserName: string;
  Email: string;
  IsSuperAdmin: boolean;
  IsActive: boolean;
  Token: string;
  PhotoPath: string;
  DepartmentId: number;
  PositionTitle: string;
  Userrole?: UserRole[];
  Userpermission?: UserPermission[];
  Applicationuser?: UserAllowApplication[];
  RefreshToken?: string;
  JwtToken?: string;
  TokenExpiration?: Date;
  AttendanceId?: number;
  EmployeeProfileId?: number;
}

export interface UserRole {
  Id: number;
  Name: string;
}

export interface UserAllowApplication {
  Id: number;
  Name: string;
}
export interface UserPermission {
  Id: number;
  Name: string;
}

export interface GetUserDataforLocalStorage {
  IsSuperAdmin?: boolean;
  userrole?: UserRole[];
  userpermission?: UserPermission[];
  applicationuser?: UserAllowApplication[];
  AttendanceId: number;
  EmployeeProfileId?: number;
}
