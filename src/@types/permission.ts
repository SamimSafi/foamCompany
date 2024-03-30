export interface IPermision {
  id?: number;
  controllerName: string;
  IsActionCatagoryMissing: number;
  controller: string;
  isGlobal: boolean;
  action: string;
  method: string;
  actionCategory: string;
  description: string;
  application?: string;
  name?: string;
}

export interface IPermissionParams {
  pageIndex: number;
  pageSize: number;
  ControllerName?: string;
  searchBy?: string;
  IsActionCatagoryMissing?: number;
  controller?: string;
  IsGlobal?: boolean;
  Action?: string;
  Method?: string;
  ActionCategory?: string;
  Description?: string;
}
export interface IApplicationDropdown {
  applicationlist: Applicationlist[];
}
export interface IPermissionDropdown {
  data: PermissionList[];
}

export interface appliCationDDlForPermission {
  name: string;
  displayName: string;
}

export interface Applicationlist {
  id: number;
  abbrevation: string;
}
export interface PermissionList {
  id: number;
  name: string;
}

export interface IControllerNameDropdown {
  name: string;
}
export interface ISubControllerNameDropdown {
  name: string;
}

export interface IGetActionOfController {
  tempId?: number;
  controller: string;
  isGlobal: boolean;
  action: string;
  method: string;
}
export interface IGetActionName {
  id?: number;
  controllerName: string;
  isGlobal?: boolean;
  action?: string;
  method?: string;
  actionCategory?: string;
  description?: string;
}

export interface PermissionFormValues {
  controllerName: string;
  applicationId: number;
  isActionCategoryMissing: number;
  permissions: permissions[];
}
export interface permissions {
  id?: number;
  controller: string;
  isGlobal: boolean;
  action: string;
  method: string;
  actionCategory: string;
  description: string;
}

export interface ICascadingDrowdown {
  action: string;
  method: string;
}
