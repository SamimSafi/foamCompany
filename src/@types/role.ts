export interface IRole {
  id?:number;
  applicationId: number | undefined;
  applicationName?: string;
  application: string | undefined;
  totalPermissions: string | undefined;
  name: string | null;
  description: string | null;
  permissionIds:number[] | undefined;
  permissionNames?: string[];
}


export interface roleDetail{
  id: number;
  name: string;
  applicationId:number;
  application:string;
  description:string;
  permissions:permissionsList[]

}

export interface permissionsList{
  id: number;
  name:string;
  controller: string;
  action: string;
  actionCategory: string;
  isDeleted: boolean;
  method: string;
  applicationId:number;
  application:string;
  description: string;
  isGlobal: boolean;
  rolesCount:number;
  cheched:boolean;
  roles:string;
}
export interface roleParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
  applicationId?: number;
  
}

export interface applicationDropdown {
  id: number;
  title: string;
}
export interface permissionDropdown {
  id: number;
  name: string;
}
