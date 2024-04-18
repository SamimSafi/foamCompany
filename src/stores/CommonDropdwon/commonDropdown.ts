import { makeAutoObservable, observable, runInAction } from 'mobx';
import {
  SelectControl,
  SelectControl6,
  SelectControl3,
  SelectControl7,
  ExternalDocumentLinkItem,
  RequestCategoryDropdown,
  ActionRequestDropdown,
  EmpDegreeDropdown,
  EmpPositionDropdown,
  EmployeeDropdown,
  softwares,
  ITEmployeeDropdown,
} from 'src/@types/common';
import {
  DocumentTypeDropdown,
  roleDropdown,
  LanguageDropdown,
  OrganizationDropDown,
  DocumentLevelDropdown,
  DepartmentDropdown,
  ProcessStatusDropdown,
  UserDropdown,
  DepartmentLevelDropdown,
  YearsDropdown,
  ShelfDropdown,
  CupboardDropdown,
  BlockDropdown,
  DepartmentDDLFromTracking,
  CardTypeDDLDropdown,
  CardDDLDropdown,
  VisitingTypeDropdown,
  OrganizationWithLocalizationDropDown,
  VisitorDropdown,
  ApplicationDropdown,
  PermissionDropdown,
  InternalDocumentDepartmentDDLFromTracking,
  ChildUserDropdown,
  OrganizationUserDropdown,
  EmployeeDropDown,
  RepresentatorDropDown,
  IDDL,
  IEmployeeHealthStatusDDL,
  IGetActiveEmp,
  IGetParentEmp,
  IHighLevelEmployeeDDL,
  ArchiveDocTypeDropdown,
} from 'src/@types/commonDropdownTypes';

import agent from 'src/api/agent';
import { OrganizationDDLFromTracking } from './../../@types/commonDropdownTypes';
import { ICountry } from 'src/@types/country';

export default class commonDroptdown {
  DepartmentOption: SelectControl[] = []; // for Department Type dropdown

  ChildDepartmentOption: SelectControl[] = []; // For Child Department DropDown

  MainRegionOption: SelectControl[] = []; // For Child Department DropDown

  ExpenseTypeOption: SelectControl[] = []; // For Child Department DropDown

  SubRegionOption: SelectControl[] = []; // For Child Department DropDown

  ProvinceOption: SelectControl[] = []; // For Child Province DropDown

  ProvinceOptionByRegion: SelectControl[] = []; // For Child Province DropDown

  DistrictOption: SelectControl[] = []; // For Child Province DropDown

  LanguageOption: SelectControl[] = []; // for Language Type dropdown

  ShelfOption: SelectControl[] = []; // for Language Type dropdown

  VisitorOption: SelectControl[] = []; // for Visitor Type dropdown

  RepresentatorOption: SelectControl[] = []; // for Representator Type dropdown

  CupboardOption: SelectControl[] = []; // for Language Type dropdown

  BlockOption: SelectControl[] = []; // for Language Type dropdown

  ArchiveDocTypeOption: SelectControl[] = []; // for ArchiveDocType dropdown

  ArchiveProjectOption: SelectControl[] = []; // for Archive Project dropdown

  YearOption: SelectControl[] = []; // for Language Type dropdown

  deparmentLevelOption: SelectControl[] = []; // for Department Level Dropdown

  UserOption: SelectControl6[] = []; // for Create User dropdown

  OraganizationUserOption: SelectControl[] = []; // for Create User dropdown

  ChildUserOption: SelectControl[] = []; // for Create User dropdown

  RolesOption: SelectControl[] = []; // for Roles dropdown

  ProcessStatusOption: SelectControl[] = [];

  FromDepartmentOption: SelectControl[] = []; // for From Department dropdown

  FromHighDepartmentOption: SelectControl[] = []; // for From Department dropdown

  ToDepartmentOption: SelectControl[] = []; // for To Department dropdown

  CCDepartmentOption: SelectControl[] = []; // for CC Department dropdown

  DocumentSecurityLevelOption: SelectControl[] = []; // for DocumentSecurityLevel dropdown

  OrganizationOption: SelectControl[] = []; // for Organization dropdown

  DocumentTypeOption: SelectControl[] = []; // for DocumentType dropdown

  InternalCcDepartmentFromTrackingOptions: SelectControl[] = []; // for Internal CC Department Tracking Option

  CcDepartmentFromTrackingOptions: SelectControl[] = []; // for Department From Tracking Options dropdown

  CcFromToDepartmetNameOptions: SelectControl3[] = []; // for Department From Tracking Options dropdown

  CcOrganizationFromTrackingOptions: SelectControl[] = []; // for Organization From Tracking Options dropdown

  CcFromToOrganizationNameOptions: SelectControl3[] = []; // for Organization From Tracking Options dropdown

  DocumentLinkTypeDropDownOptions: SelectControl[] = []; // for Document link dropdown

  CardTypeOption: SelectControl[] = []; // for Card Type dropdown

  CardOption: SelectControl6[] = []; // for Card  dropdown

  VisitingTypeOption: SelectControl[] = []; // for Visiting Type Dropdown

  ApplicationOption: SelectControl[] = []; // for Application Dropdown

  PermissionOption: SelectControl[] = []; // for Application Dropdown

  RequestCategoryOption: SelectControl[] = []; // for dropdown

  ActionRequstOption: SelectControl[] = []; // for dropdown

  ITEmployeeOption: SelectControl[] = []; // for dropdown

  EmployeeOption: SelectControl[] = []; // for Employee DDl

  EmployeeOptionByDepartment: SelectControl[] = []; // for Employee DDl

  EmployeeDegreeOption: SelectControl[] = []; // for dropdown

  EmployeePositionOption: SelectControl[] = []; // for dropdown

  SoftwareOption: softwares[] = []; // for Software dropdown

  HardwareOption: SelectControl[] = []; // for  Hardware dropdown

  ProjectTypeOption: SelectControl[] = []; // Project Type

  ProjectPriorityOption: SelectControl[] = []; // Project Priority

  ConstructionTypeOption: SelectControl[] = []; // Construction Type

  ActivityTypeOption: SelectControl[] = []; // Activity Type

  AttachmentTypeOption: SelectControl[] = []; // Activity Type

  EducationLevelOption: SelectControl[] = []; // Activity Type

  EducationTitleOption: SelectControl[] = []; // Activity Type

  CardGenerationTypeOption: SelectControl[] = []; // Activity Type

  SubActivityTypeOption: SelectControl[] = []; // Sub Activity Type

  ContractTypeOption: SelectControl[] = [];

  PositionTitleOption: SelectControl[] = [];

  JobPositionOption: SelectControl[] = [];

  GradeOption: SelectControl[] = [];

  GradeStepOption: SelectControl[] = [];

  EmpHealthStatusOption: SelectControl[] = [];

  // Country Select Control
  CountryOption: SelectControl[] = [];

  // High Level Employee Select Control
  GetHighLevelEmployee: SelectControl[] = [];

  GetAuthorityEmployee: SelectControl[] = [];

  // Get Active Employee
  GetActiveEmployeeOption: SelectControl[] = [];

  // Get Parent Employee
  GetParentEmployeeOption: SelectControl[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadEmployeeDegreeDropdown = async () => {
    // try {
    // const result = await agent.EmployeesDegree.EmpDegreeDDL();
    //   this.setEmployeeDegreeOptions(result.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  setEmployeeDegreeOptions = (data: EmpDegreeDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.EmployeeDegreeOption = op;
  };

  loadRoleDropdown = async () => {
    //console.log(agent.Permissions.getList({pageIndex:0,pageSize:10}));
    try {
      const result = await agent.RolesAgent.getRoleDDl();
      this.setRoleDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setRoleDropdown = (data: roleDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.RolesOption = op;
  };

  loadLanguageDropdown = async () => {
    //console.log(agent.Permissions.getList({pageIndex:0,pageSize:10}));
    try {
      const result = await agent.Lanugages.getLanguageDDL();
      this.setLanguageDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setLanguageDropdown = (data: LanguageDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.LanguageOption = op;
  };

  setDocumentSecurityLevelDropdown = (data: DocumentLevelDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.DocumentSecurityLevelOption = op;
  };

  setOrganizationDropdown = (data: OrganizationWithLocalizationDropDown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.OrganizationOption = op;
  };

  // User  Dropdown
  loadUserDropdown = async (depId: any, isLoggedUser?: boolean) => {
    if (!isLoggedUser) {
      isLoggedUser = false;
    }
    try {
      const result = await agent.createUser.userDropDownbyDepartment(depId, isLoggedUser);
      console.log(result);
      this.setUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setUserOptions = (data: UserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
        dep: op.departmentId,
      };
      return optRow;
    });
    this.UserOption = op;
  };

  // User  Dropdown
  loadRelatedUserByDepartmentDDL = async () => {
    try {
      const result = await agent.Employees.getEmpRelatedDepartmentDDL();
      this.setRelatedUserByDepartmentDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setRelatedUserByDepartmentDDL = (data: EmployeeDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.EmployeeOption = op;
  };

  loadOrganizationUserDropdown = async (orgId: any) => {
    try {
      const result = await agent.createUser.UserDDlByOrganization(orgId);
      // console.log(result);
      this.setUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setOrganizationUserOptions = (data: OrganizationUserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
      };
      return optRow;
    });
    this.OraganizationUserOption = op;
  };

  // User  Dropdown
  loadChildUserDropdown = async () => {
    try {
      const result = await agent.createUser.childUserDDl();
      this.setChildUserOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setChildUserOptions = (data: ChildUserDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.userName,
        value: op.id,
      };
      return optRow;
    });
    this.ChildUserOption = op;
  };

  // Year Dropdown
  loadYearDropdown = async () => {
    try {
      const result = await agent.Years.YearDDL();
      this.setYearOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setYearOptions = (data: YearsDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.yearShamsi,
        value: op.id,
      };
      return optRow;
    });
    this.YearOption = op;
  };

  // Shelf Dropdown
  loadPermissionDropdown = async (id: number) => {
    try {
      const result = await agent.Permissions.getPermissionDDL(id);
      this.setPermissionDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPermissionDropdown = (data: PermissionDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.PermissionOption = op;
  };

  loadEmployeePositionDropdown = async () => {
    // try {
    //  // const result = await agent.EmployeesPosition.EmpPositionDDL();
    //   this.setEmployeePositionOptions(result.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  setEmployeePositionOptions = (data: EmpPositionDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.EmployeePositionOption = op;
  };

  // Employee Dropdown
  loadEmployeeDropdown = async (EmpStatus: any) => {
    try {
      const result = await agent.Employees.EmpDDL(EmpStatus);

      this.setEmployeeOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setEmployeeOptions = (data: EmployeeDropDown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name + ('(' + op.fatherName + ')'),
        value: op.id,
        hasAccount: op.hasAccount,
      };
      return optRow;
    });
    this.EmployeeOption = op;
  };

  // Employee Dropdown
  loadEmployeeDropdownByDepartment = async (EmpStatus: number): Promise<SelectControl[]> => {
    try {
      const result = await agent.Employees.EmpDDLByDepartment(EmpStatus);
      const employeeOptions = this.setEmployeeOptionsByDepartment(result.data);
      return employeeOptions;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  setEmployeeOptionsByDepartment = (data: EmployeeDropDown[]): SelectControl[] => {
    return data.map((op) => ({
      text: op.name + ('(' + op.fatherName + ')'),
      value: op.id,
    }));
  };

  // Province Dropdown
  loadProvinceDropdown = async () => {
    try {
      const result = await agent.province.provinceDDL();
      this.setProvinceOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setProvinceOptions = (data: LanguageDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ProvinceOption = op;
  };

  // Province Dropdown
  loadProvinceDropdownByRegion = async (MainRegionID: number) => {
    try {
      const result = await agent.province.provinceDDLByMainRegion(MainRegionID);
      this.setProvinceByRegionOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setProvinceByRegionOptions = (data: LanguageDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ProvinceOptionByRegion = op;
  };

  // District Dropdown
  loadDistrictDropdown = async (provinceId: any) => {
    try {
      const result = await agent.district.districtDDL(provinceId);
      this.setDistrictOptions(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setDistrictOptions = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.DistrictOption = op;
  };

  // loadContractTypeDDL
  loadContractTypeDDL = async () => {
    try {
      const result = await agent.ContractType.DDl();

      this.setContractTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setContractTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ContractTypeOption = op;
  };

  // loadPositionTitleDDL
  loadPositionTitleDDL = async (departmentId: any) => {
    try {
      const result = await agent.PositionTitle.DDl(departmentId);

      this.setPositionTitleDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setPositionTitleDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
        isActive: op.isActive,
      };
      return optRow;
    });
    this.PositionTitleOption = op;
  };

  // loadJobPositionDDL
  loadJobPositionDDL = async () => {
    try {
      const result = await agent.JobPosition.DDl();

      this.setJobPositionDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setJobPositionDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.JobPositionOption = op;
  };

  // Country Dropdown
  loadCountryDropdown = async () => {
    try {
      const result = await agent.Country.DDl();
      this.setCountryDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setCountryDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.CountryOption = op;
  };

  // ExpenseType Dropdown
  loadExpenseTypeDropdown = async () => {
    try {
      const result = await agent.ExpenseType.DDl();
      this.setExpenseTypeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setExpenseTypeDDL = (data: IDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.ExpenseTypeOption = op;
  };

  // Get Active Employee
  loadGetActiveEmployeeDropdown = async (id: number) => {
    try {
      const result = await agent.GetActiveEmp.DDl(id);
      this.setGetActiveEmployeeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setGetActiveEmployeeDDL = (data: IGetActiveEmp[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.employeeFullName,
        value: op.contractId,
      };
      return optRow;
    });
    this.GetActiveEmployeeOption = op;
  };

  // Get Parent Employee
  loadGetParentEmployeeDropdown = async (id: number) => {
    try {
      const result = await agent.GetParentEmp.DDl(id);
      this.setGetParentEmployeeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setGetParentEmployeeDDL = (data: IGetParentEmp[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.GetParentEmployeeOption = op;
  };

  // Get High Level Employee Dropdown
  loadHighLevelEmployeeDropdown = async () => {
    try {
      const result = await agent.GetParentEmp.HighLevelEmployeeDDl();
      this.setHighLevelEmployeeDDL(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setHighLevelEmployeeDDL = (data: IHighLevelEmployeeDDL[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.employeeFullName,
        value: op.contractId,
      };
      return optRow;
    });
    this.GetHighLevelEmployee = op;
  };
}
