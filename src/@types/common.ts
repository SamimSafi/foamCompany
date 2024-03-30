//All common interface will be here

export interface tableRowsColor {
  lightGreen: string;
  darkGreen: string;
}
export interface SelectControl {
  text: string;
  value: string | number;
  hasAccount?:boolean;
  isActive?:boolean;
}

export interface SelectControlAttachments {
  id: number;
  archiveId: number;
  path: string;
  fileType: string;
  detail: string;
}

export interface SelectControl3 {
  text: string;
}

export interface SelectControl4 {
  text: string;
}
export interface SelectControl5 {
  text: string;
  value: number;
  step: number;
}
export interface SelectControl6 {
  text: string;
  value: any;
  dep?: number;
}
export interface SelectControl7 {
  text: number | string;
  value: number | string;
}

export interface softwares {
  text: string;
  value: string | number;
  version: string;
}
export interface InternalDocumentLinkItem {
  internalDocumentId?: number;
  fromDepartmentEnglishName?: string;
  toDepartmentEnglishName?: string;
  documentTypeEnglishName?: string;
  documentLevelEnglishName?: string;
  documentDate?: string;
  documentNo?: number;
  trackingNO?: number;
}

export interface InternalDocumentReportItem {
  userName: string;
  fromDepartmentName: string;
  toDepartmentName: string;
  documentType: string;
  securityLevel: string;
  documentStatus: string;
  documentDate: string;
  inOutDocumentNumber: number;
  documentBookRecivedNumber: number;
}

export interface response {
  code: number;
  message: string;
  error: any[];
}
export interface ExternalDocumentLinkItem {
  externalDocumentId?: number;
  fromToDepartmentName?: string;
  fromToOrganizationName?: string;
  documentTypeName?: string;
  documentLevelName?: string;
  documentDate?: string;
  documentNo?: number;
  trackingNO?: number;
  documentInOutType?: string;
}

export interface RequestCategoryDropdown {
  id: number;
  name: string;
}

export interface ActionRequestDropdown {
  id: number;
  name: string;
}
export interface ITEmployeeDropdown {
  userId: number;
  userName: string;
}
export interface EmpDegreeDropdown {
  id: number;
  name: string;
}

export interface EmpPositionDropdown {
  id: number;
  name: string;
}

export interface EmployeeDropdown {
  id: number;
  name: string;
  
}
