export interface LanguageDropdown {
  id: number;
  name: string;
}

export interface EmployeeDropDown {
  id: number;
  name: string;
  fatherName: string;
  position: string;
  hasAccount: boolean;
}

export interface RepresentatorDropDown {
  id: number;
  name: string;
  contactNumber1: string;
  email: string;
}

export interface DocumentTypeDropdown {
  id: number;
  name: string;
}

export interface OrganizationDropDown {
  id: number;
  name: string;
}

export interface OrganizationWithLocalizationDropDown {
  id: number;
  name: string;
}

export interface DocumentLevelDropdown {
  id: number;
  name: string;
}

// Department Dropdown
export interface DepartmentDropdown {
  id: number;
  name: string;
}

// Department Level Dropdown
export interface DepartmentLevelDropdown {
  id: number;
  name: string;
}

export interface roleDropdown {
  id: number;
  name: string;
}

export interface ProcessStatusDropdown {
  id: number;
  processStatusName: string;
}

export interface UserDropdown {
  id: number;
  userName: string;
  departmentId: number;
}

export interface OrganizationUserDropdown {
  id: number;
  userName: string;
}

export interface ChildUserDropdown {
  id: number;
  userName: string;
}

export interface YearsDropdown {
  id: number;
  yearShamsi: string;
  setDefault: boolean;
}

export interface ShelfDropdown {
  id: number;
  name: string;
}

export interface CupboardDropdown {
  id: number;
  cupBoardNumber: string;
}

export interface BlockDropdown {
  id: number;
  name: string;
}

//
export interface ArchiveDocTypeDropdown {
  id: number;
  name: string;
}

export interface ArchiveProjectDropdown {
  id: number;
  name: string;
}

export interface InternalDocumentDepartmentDDLFromTracking {
  departmentId: number;
  departmenthName: string;
}

export interface DepartmentDDLFromTracking {
  trackingDepartmentId: number;
  trackingDepartmentName: string;
  fromToDepartmetName: string;
}

export interface OrganizationDDLFromTracking {
  trackingOrganizationId: number;
  trackingOrganizationName: string;
  fromToOrganizationName: string;
}

export interface CardTypeDDLDropdown {
  id: number;
  name: string;
}

export interface CardDDLDropdown {
  id: number;
  cardNumber: string;
}

//Common Dropdown Type
export interface VisitingTypeDropdown {
  id: number;
  name: string;
}
//Common Dropdown Type
export interface VisitorDropdown {
  id: number;
  fullName: string;
  fatherName: string;
}
//Application Dropdown
export interface ApplicationDropdown {
  id: number;
  applicationName: string;
}

//Permission Dropdown
export interface PermissionDropdown {
  id: number;
  name: string;
}

//DDl
export interface IDDL {
  id: number;
  name: string;
  isActive?: boolean;
}

//Get High Level Employee
export interface IHighLevelEmployeeDDL {
  contractId: number;
  employeeProfileId: number;
  employeeFullName: string;
  employeePosition: string;
  departmentId: number;
  departmentName: string;
}

//Get Active Employee
export interface IGetActiveEmp {
  contractId: number;
  employeeFullName: string;
}

export interface IEmployeeHealthStatusDDL {
  id: number;
  name: string;
}

//Get Parent Employee
export interface IGetParentEmp {
  id: number;
  parentId: number;
  name: string;
}

export interface IParentEmployeeDDL {
  id: number;
  name: string;
}
