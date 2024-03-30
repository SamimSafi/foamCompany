export interface CreateUser {
  id?: string | undefined;
  employeeId?: number;
  userName: string;
  email?: string;
  employeeName?: string;
  password?: string;
  afterSubmit?: string;
}

export interface UserLog {
  id: number;
  userName: string;
  userId: string;
  action: string;
  user: string;
  actionOn: string;
  ipAddress: string;
  deviceName: string;
  result: boolean;
  message:   string;
  browserName: string;
  browserVersion: string;
  os: string;
  deviceType: string;
}

export interface DocumentsLevel {
  id: number;
  englishName: string;
  dariName: string;
  pashtoName: string;
  code: string;
}

// Interface ast ba khater data ra as api begerem
export interface userDetail {
  id?: string | undefined;
  userName: string;
  phoneNumber: string;
  email: string;
  photoPath: string;
  departmentName: string;
  language: string;
  employeeId?: number;
  employeeName?: string;
  representatorId?: number;
  positionName: string;
  isActive?: boolean | null;
  isManager?: boolean | null;
  profilePhoto: Blob | null;
  userRoles: userRoles[];
  alloweddepartmentlevelModels: departments[];
  alloweddocumentLevelModels: DocumentsLevel[];
  alloweddocumenttypeModels: documentType[];
  organizationId: string;
}

export interface responseCode {
  code: number;
  data: {
    email: string;
    password: string;
    userName: string;
  };
  message: string;
}
export interface userCreateResponse {
  email: string;
  password: string;
  userName: string;
}
export interface userRoles {
  id: number;
  name: string;
  description: string;
  application: string;
  totalPermissions: number;
}

export interface DocumentsLevel {
  id: number;
  englishName: string;
  dariName: string;
  pashtoName: string;
  code: string;
}

export interface departments {
  id: number;
  englishName: string;
  dariName: string;
  pashtoName: string;
  code: string;
}

export interface documentType {
  id: number;
  englishName: string;
  dariName: string;
  pashtoName: string;
  code: string;
}

export interface chPassword {
  Id?: string;
  currentPassword: string;
  newPassword: string;
  afterSubmit?: string;
  confirmNewPassword?: string;
}

export interface deleteUser {
  Id?: string;
  remarks: string;
}

export interface ResetPassword {
  id?: string;
  newPassword?: string;
}
export interface userActivate {
  id?: string;
  isActive?: boolean;
}
export interface userParams {
  pageIndex?: number;
  pageSize?: number;
  UserName?: string;
  isActive?: string;
  email?: string;
  searchBy?: string;
  departmentId?: number;
}

export interface userLogParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}

