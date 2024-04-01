import { IInvestor, IInvestorParams } from './../@types/foamCompanyTypes/investor';

import axios, { AxiosResponse } from 'axios';
import {
  LoginFormValue,
  ResetPassword,
  SendVerificationCode,
  User,
  VerificationCodeResponse,
  VerifyVerificationCode,
} from '../@types/login';

import { ILanguage, ILanguageParams } from '../@types/language';
import {
  IControllerNameDropdown,
  IGetActionOfController,
  //IPermissionDropdown,
  IPermissionParams,
  PermissionFormValues,
  permissions,
  //PermissionList,
} from '../@types/permission';
import { IRole, roleDetail, roleParams } from 'src/@types/role';
import { CreateUser, userParams, userDetail, userLogParams } from 'src/@types/createUser';


import { YearInterface, YearParams } from 'src/@types/Year';
import {
  DashBoardByCurrantDayAndProcessStatus,
  DashBoardByRequestCategoriesBeforeAndAfterDeadLine,
  DashBoardByUserBeforeAndAfterDeadLine,
} from 'src/@types/itsmsDashboard';
import {
  EmployeeAccountReport,
  IEmployee,
  IEmployeeDetails,
  IEmployeeParams,
} from 'src/@types/foamCompanyTypes/Employee';
import { IEmployeePosition, IEmployeePositionParams } from 'src/@types/EmployeePosition';


import { IPositionTitle, IPositionTitleParams } from 'src/@types/foamCompanyTypes/PositionTitle';
import { IJobPosition, IJobPositionParams } from 'src/@types/JobPosition';


import { ICountry } from 'src/@types/country';

import { UserReport } from 'src/@types/userReport';
import { Province, ProvinceParams } from 'src/@types/province';
import { District, DistrictParams } from 'src/@types/district';
import { IContractType, IContractTypeParams } from 'src/@types/foamCompanyTypes/ContractType';
import { IContractDetails, IContractDetailsParams } from 'src/@types/foamCompanyTypes/ContractDetails';
import { IBranch, IBranchParams } from 'src/@types/foamCompanyTypes/branch';
import { IUnitOfMeasure, IUnitOfMeasureParams } from 'src/@types/foamCompanyTypes/unitOfMeasure';
import { IExpenseType, IExpenseTypeParams } from 'src/@types/foamCompanyTypes/expenseType';
import { ICustomer, ICustomerParams } from 'src/@types/foamCompanyTypes/customer';
import { ISupplier, ISupplierParams } from 'src/@types/foamCompanyTypes/Supplier';

 //axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = 'http://localhost:7073/api/';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('mewToken');
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log('err');
    throw error;
  }
);

const responseBody = <T>(respons: AxiosResponse<T>) => respons.data;

///<T> we added generic type for it so we can latter assign any kind of data is requested
const requests = {
  get: <T>(url: string) =>
    axios
      .get<T>(url, {
        withCredentials: true,
      })
      .then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string, body: {}) => axios.delete<T>(url, body).then(responseBody),
};

// Login
const Logins = {
  login: (login: LoginFormValue) => requests.post<User>('/Auth/SignIn', login),
  SendCode: (sendCode: SendVerificationCode) =>
    requests.post<void>('/Auth/ForgetPassword-SendVerificationCode', sendCode),
  VerifyCode: (verifyCode: VerifyVerificationCode) =>
    requests.post<VerificationCodeResponse>(
      '/Auth/ForgetPassword-RecieveVerificationCode',
      verifyCode
    ),
  ResetPassword: (resetPassword: ResetPassword) =>
    requests.post<void>('/Auth/ForgetPassword-PasswordReset', resetPassword),
  current: () => requests.post<User>('/Auth/refresh-token', {}),
  refreshToken: () => requests.post<User>('/Auth/refresh-token', {}),
  sendCode: (sendCode: SendVerificationCode) =>
    requests.post<SendVerificationCode>('/Auth/ForgetPassword-SendVerificationCode', sendCode),
  verifyCode: (verifyCode: VerifyVerificationCode) =>
    requests.post<VerificationCodeResponse>(
      '/Auth/ForgetPassword-RecieveVerificationCode',
      verifyCode
    ),
  resetPassword: (resetPassword: ResetPassword) =>
    requests.post<void>('/Auth/ForgetPassword-PasswordReset', resetPassword),
};

// Permission
const Permissions = {
  create: (permission: PermissionFormValues) => requests.post<void>('/Permission', permission),
  getList: (param: IPermissionParams) =>
    axios.post<any>('/Permission/List', param, { withCredentials: true }),
  update: (permission: permissions) =>
    requests.put<void>(`/Permission/${permission.id}`, permission),
  delete: (id: number, remark: string) => axios.delete<void>(`/Permission/${id}`, { data: remark }),
  // getList: (param: IPermissionParams) => axios.post<any>('/Permission/GetControllers', param),
  List: (param: IPermissionParams) =>
    axios.post<any>('/Permission/List', param, { withCredentials: true }),
  getPermissionDDL: (id: number) =>
    axios.get<any>(`/Permission/Permission-DropDownList/${id}`, {
      withCredentials: true,
    }),
};

// Get Controller Name
const ControllerNames = {
  getContollerList: (name: string) =>
    requests.get<IControllerNameDropdown[]>(`/Permission/Get-Controllers-Dropdown/${name}`), //
  getActionOfController: (name: string) =>
    requests.get<IGetActionOfController[]>(
      `/Permission/GetActionOfController?ControllerName=${name}`
    ),
  getApplicationList: () => axios.get<any>('/Application/GetAllApplication').then(responseBody),
  getApplicationListForPermis: () => axios.get<any>('/Permission/Get-Application-Dropdown'),
};

// Language
const Lanugages = {
  create: (language: ILanguage) => axios.post<any>('/Language', language),
  getList: (param: ILanguageParams) =>
    axios.post<any>('/Language/Get-Language-List', param, { withCredentials: true }),
  getLanguageDDL: () =>
    axios.get<any>('/Language/Get-Language-DDL', {
      withCredentials: true,
    }),
  // getList: () => axios.post<any>('/Language/Get-Language-List'),
  update: (language: ILanguage) => requests.put<void>(`/Language/${language.id}`, language),
  delete: (id: number, remark: string) => axios.delete<void>(`/Language/${id}`, { data: remark }),
};



// Employee
const Employees = {
  create: (data: IEmployee, file: Blob) => {
    let formData = new FormData();
   
    formData.append('name', data.name!);
    formData.append('fatherName', data.fatherName!);
    formData.append('tazkiraNo', data.tazkiraNo!);
    formData.append('dateOfBirth', data.dateOfBirth!.toDateString());
    formData.append('provinceId', data.provinceId!.toString());
    formData.append('districtId', data.districtId!.toString());
    formData.append('branchId', data.branchId!.toString());
    formData.append('gender', data.gender!.toString());
    formData.append('age', data.age!);
    formData.append('isInvestor', data.isInvestor!.toString());
    formData.append('tazkiraTypeId', data.tazkiraTypeId!.toString());
    formData.append('joldNo', data.joldNo!);
    formData.append('pageNo', data.pageNo!);
    formData.append('regNo', data.regNo!);
    formData.append('phoneNumber', data.phoneNumber!);
    formData.append('profilePhoto', file);
    return axios.post<IEmployee, any>('/EmployeeProfile', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },
  // create: (employee: IEmployee) => requests.post<void>('/Employee', employee),
  getList: (param: IEmployeeParams) =>
    axios.post<any>(`/EmployeeProfile/GetList`, param, { withCredentials: true }),
  update: (data: IEmployee, file: Blob) => {
    let formData = new FormData();
    
    formData.append('name', data.name!);
    formData.append('fatherName', data.fatherName!);
    formData.append('tazkiraNo', data.tazkiraNo!);
    formData.append('dateOfBirth', data.dateOfBirth!.toDateString());
    formData.append('provinceId', data.provinceId!.toString());
    formData.append('districtId', data.districtId!.toString());
    formData.append('branchId', data.branchId!.toString());
    formData.append('gender', data.gender!.toString());
    formData.append('age', data.age!);
    formData.append('isInvestor', data.isInvestor!.toString());
    formData.append('tazkiraTypeId', data.tazkiraTypeId!.toString());
    formData.append('joldNo', data.joldNo!);
    formData.append('pageNo', data.pageNo!);
    formData.append('regNo', data.regNo!);
    formData.append('phoneNumber', data.phoneNumber!);
    if (file) {
      formData.append('profilePhoto', file);
    }
    return axios.put<IEmployee>(`/EmployeeProfile/${data.id}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  },
  //update: (emp: IEmployee) => requests.put<void>(`/Employee/${emp.id}`, emp),
  detail: (empId: any) => requests.get<void>(`/EmployeeProfile/GetDetail/${empId}`),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/EmployeeProfile/${id}`, { data: remark }),
  employeeDetail: (id: number) =>
    requests.get<IEmployeeDetails>(`/EmployeeProfile/GetDetail/${id}`),
  EmpDDLByDepartment: (empId: number) =>
    axios.get<any>(`/EmployeeProfile/GetEmployeeProfileDDLByDepartmentId/${empId}`),
  EmpDDL: (empStatus: any) =>
    axios.get<any>(`/EmployeeProfile/GetEmployeeProfileDDL/${empStatus}`, {
      withCredentials: true,
    }),
  getEmpRelatedDepartmentDDL: () =>
    axios.get<any>(`/EmployeeProfile/GetRelatedUserInDepartment`, {
      withCredentials: true,
    }),
  getEmpForEdit: (id: number) =>
    axios.get<any>(`/EmployeeProfile/GetEmployeeProfileForEdit/${id}`, { withCredentials: true }),

  getEmployeeAccountReport: (param: EmployeeAccountReport) =>
    axios.post<any>(`/EmployeeReport/Get-Employee-Reports`, param, { withCredentials: true }),
};

// Province
const province = {
  create: (province: Province) => requests.post<void>('/Province', province),
  getList: (param: ProvinceParams) =>
    axios.post<any>(`/Province/GetList`, param, { withCredentials: true }),
  update: (province: Province) => requests.put<void>(`/Province/${province.id}`, province),
  delete: (id: number, remark: string) => axios.delete<void>(`/Province/${id}`, { data: remark }),
  provinceDDL: () =>
    axios.get<any>(`/Province/GetProvinceDDL`, {
      withCredentials: true,
    }),
  provinceDDLByMainRegion: (MainRegionID: number) =>
    axios.get<any>(`/Province/GetProvinceByMainRegion/${MainRegionID}`, {
      withCredentials: true,
    }),
};


// District
const district = {
  create: (district: District) => requests.post<void>('/District', district),
  getList: (param: DistrictParams) =>
    axios.post<any>(`/District/GetList`, param, { withCredentials: true }),
  update: (district: District) => requests.put<void>(`/District/${district.id}`, district),
  delete: (id: number, remark: string) => axios.delete<void>(`/District/${id}`, { data: remark }),
  districtDDL: (id: number) =>
    axios.get<any>(`/District/GetDistrictDDL/${id}`, {
      withCredentials: true,
    }),
  districtDetail: (id: number) =>
    axios.get<District>(`/District/GetDetail/${id}`, {
      withCredentials: true,
    }),
};

// Employee Position
const EmployeesPosition = {
  create: (Applicant: IEmployeePosition) => requests.post<void>('/EmployeePosition', Applicant),
  getList: (param: IEmployeePositionParams) =>
    axios.post<any>(`/EmployeePosition/GetList`, param, { withCredentials: true }),
  update: (Applicant: IEmployeePosition) =>
    requests.put<void>(`/EmployeePosition/${Applicant.id}`, Applicant),
  detail: (ApplicantId: any) => requests.get<void>(`/EmployeePosition/GetDetail/${ApplicantId}`),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/CardDetails/${id}`, { data: remark }),
};

// PositionTitle
const PositionTitle = {
  create: (PositionTitle: IPositionTitle) => requests.post<void>('/PositionTitle', PositionTitle),
  getList: (param: IPositionTitleParams) =>
    axios.post<any>(`/PositionTitle/GetList`, param, { withCredentials: true }),
  update: (PositionTitle: IPositionTitle) =>
    requests.put<void>(`/PositionTitle/${PositionTitle.id}`, PositionTitle),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/PositionTitle/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/PositionTitle/GetDropDownList/${departmentId}`, { withCredentials: true }),
};

// JobPosition
const JobPosition = {
  create: (JobPosition: IJobPosition) => requests.post<void>('/JobPosition', JobPosition),
  getList: (param: IJobPositionParams) =>
    axios.post<any>(`/JobPosition/GetList`, param, { withCredentials: true }),
  update: (JobPosition: IJobPosition) =>
    requests.put<void>(`/JobPosition/${JobPosition.id}`, JobPosition),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/JobPosition/${id}`, { data: remark }),
  DDl: () => axios.get<any>('/JobPosition/GetJobPositionDDL'),
};

// Roles
const RolesAgent = {
  create: (roles: IRole) => requests.post<void>('/Role', roles),
  getList: (param: roleParams) => axios.post<any>('/Role/List', param, { withCredentials: true }),
  getRoleDDl: () =>
    axios.get<any>('/Role/RolesDropdown', {
      withCredentials: true,
    }),
  update: (roles: IRole) => requests.put<void>(`/Role/${roles.id}`, roles),
  getDetail: (id: number) => requests.get<roleDetail>(`/Role/${id}`),
  delete: (id: number, remark: string) => axios.delete<void>(`/Role/${id}`, { data: remark }),
};

// User Creation Agent
const createUser = {
  create1: (data: CreateUser) => axios.post<CreateUser, any>('/User/CreateUser', data),
  update: (data: CreateUser) => axios.put<CreateUser>('/User/UpdateUser', data),
  create: (data: CreateUser) => requests.post<void>('/User/CreateUser', data),
  getUsers: (param: userParams) => axios.post<any>('/User/GetUsers', param),
  getUsersLog: (param: userLogParams) => axios.post<any>('/User/UserLog', param),
  userDetail: (id: string) => requests.get<userDetail>(`/User/GetUserByID/${id}`),

  //request axios
  delete: (Id: string, remarks: string) => axios.delete<void>(`/User/${Id}`, { data: { remarks } }),
  resetPassword: (ID: string, NewPassword: string) =>
    requests.post<void>(`/User/PasswordReset`, { ID, NewPassword }),
  changePassword: (Id: string, currentPassword: string, newPassword: string) =>
    axios.post<void>(`/User/ChangePassword/`, { Id, currentPassword, newPassword }),
  userActivate: (id: string, isActive: boolean) =>
    axios.post<void>(`/User/UserActivation/`, { id, isActive }),
  userProfile: () => axios.get<userDetail>(`/Profile/`),
  userDropDownbyDepartment: (dep: any, isLoggedUser?: any) =>
    axios.get<any>(`/User/UsersDropdown/${dep}/${isLoggedUser}`, {
      withCredentials: true,
    }),
  childUserDDl: () =>
    axios.get<any>(`/User/ChildUsersDropdown/`, {
      withCredentials: true,
    }),
  UserDDlByOrganization: (organizationId: any) =>
    axios.get<any>(`/User/UsersDropdownByOrg/${organizationId}`, {
      withCredentials: true,
    }),
  getUserReport: (param: UserReport) =>
    axios.post(`/UserReport/Get-User-Reports`, param, { withCredentials: true }),
};

//Year
const Years = {
  create: (Year: YearInterface) => requests.post<void>('/Year', Year),
  getList: (Year: YearParams) => axios.post<any>('/Year/GetList', Year, { withCredentials: true }),
  delete: (id: number, remarks: string) => axios.delete<void>(`/Year/${id}`, { data: remarks }),
  update: (Year: YearInterface) => requests.put<void>(`/Year/${Year.id}`, Year),
  YearDDL: () =>
    axios.get<any>(`/Year/GetYearDDL`, {
      withCredentials: true,
    }),
};


const changeLanguage = {
  ChangeLanguage: (language: any) =>
    axios.post<any>(`/ChangeLanguage/${language} `, {}, { withCredentials: true }),
  getIpAndMac: () =>
    axios.get<any>(`/IPandMACAddress/GetIPandMACAddress`, {
      withCredentials: true,
    }),
};

const itsmsDashboard = {
  ByRequestCategoryBeforeAndAfterDeadline: (status: boolean) =>
    axios.get<DashBoardByRequestCategoriesBeforeAndAfterDeadLine[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByRequestCategoriesBeforeAndAfterDeadLine/${status}`
    ),
  ByUserBeforeAndAfterDeadLine: (status: boolean) =>
    axios.get<DashBoardByUserBeforeAndAfterDeadLine[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByUserBeforeAndAfterDeadLine/${status}`
    ),
  pendingTickets: () =>
    axios.get<DashBoardByCurrantDayAndProcessStatus[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByCurrantDayVisitorAndProcessStatus/${3}`
    ),
  approvedTickets: () =>
    axios.get<DashBoardByCurrantDayAndProcessStatus[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByCurrantDayVisitorAndProcessStatus/${5}`
    ),
  processStartTickets: () =>
    axios.get<DashBoardByCurrantDayAndProcessStatus[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByCurrantDayVisitorAndProcessStatus/${10}`
    ),
  completedTickets: () =>
    axios.get<DashBoardByCurrantDayAndProcessStatus[]>(
      `ITSMSDashBoardsAndReports/DashBoard-ByCurrantDayVisitorAndProcessStatus/${1}`
    ),
};


// ContractType
const ContractType = {
  create: (ContractType: IContractType) => requests.post<void>('/ContractType', ContractType),
  getList: (param: IContractTypeParams) =>
    axios.post<any>(`/ContractType/GetList`, param, { withCredentials: true }),
  update: (ContractType: IContractType) =>
    requests.put<void>(`/ContractType/${ContractType.id}`, ContractType),
  // detail: (ContractTypeId: any) =>
  //   requests.get<void>(`/ContractType/GetDetail/${ContractTypeId}`),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/ContractType/${id}`, { data: remark }),
  DDl: () =>
    axios.get<any>('/ContractType/GetDropDownList', {
      withCredentials: true,
    }),
};

// Country Lookup
const Country = {
  getList: (param: ICountry) =>
    axios.post<any>(`/Country/GetList`, param, { withCredentials: true }),
  DDl: () =>
    axios.get<any>('/Country/GetDropDownList', {
      withCredentials: true,
    }),
};

// Get Active Employee Lookup
const GetActiveEmp = {
  DDl: (GetActiveEmp: any) =>
    axios.get<any>(`/EmployeeProfile/GetActiveEmplyeeDDLByDepartment/${GetActiveEmp}`, {
      withCredentials: true,
    }),
};

// ContractDetails
const ContractDetails = {
  create: (Applicant: IContractDetails) => requests.post<void>('/ContractDetails', Applicant),
  getList: (param: IContractDetailsParams, empId: any) =>
    axios.post<any>(`/ContractDetails/GetList/${empId}`, param, { withCredentials: true }),
  update: (Applicant: IContractDetails) =>
    requests.put<void>(`/ContractDetails/${Applicant.id}`, Applicant),
  detail: (ApplicantId: any) => requests.get<void>(`/ContractDetails/GetDetail/${ApplicantId}`),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/ContractDetails/${id}`, { data: remark }),
  getEmpCurrentContract: (id: number) =>
    axios.get<any>(`/ContractDetails/GetEmployeeCurrentContract/${id}`, { withCredentials: true }),
};

// Get Active Employee Lookup
const GetParentEmp = {
  DDl: (GetParentEmp: any) =>
    axios.get<any>(`/Department/GetParentDepartment/${GetParentEmp}`, {
      withCredentials: true,
    }),
  HighLevelEmployeeDDl: () =>
    axios.get<any>('/EmployeeProfile/GetHighLevelEmployees', {
      withCredentials: true,
    }),
  GetAuthorithyEmployeeDDl: () =>
    axios.get<any>('/EmployeeProfile/GetAuthoritiesDDL', {
      withCredentials: true,
    }),
};
// Foam Company Api Start

// Branch
const Branch = {
  create: (Branch: IBranch) => requests.post<void>('/Branch', Branch),
  getList: (param: IBranchParams) =>
    axios.post<any>(`/Branch/GetList`, param, { withCredentials: true }),
  update: (Branch: IBranch) =>
    requests.put<void>(`/Branch/${Branch.id}`, Branch),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/Branch/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/Branch/GetDropDownList/${departmentId}`, { withCredentials: true }),
};
// Customer
const Customer = {
  create: (Customer: ICustomer) => requests.post<void>('/Customer', Customer),
  getList: (param: ICustomerParams) =>
    axios.post<any>(`/Customer/GetList`, param, { withCredentials: true }),
  update: (Customer: ICustomer) =>
    requests.put<void>(`/Customer/${Customer.id}`, Customer),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/Customer/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/Customer/GetDropDownList/${departmentId}`, { withCredentials: true }),
};
// Unite Of measure
const UniteOfMeasure = {
  create: (unit: IUnitOfMeasure) => requests.post<void>('/UniteOfMeasurement', unit),
  getList: (param: IUnitOfMeasureParams) =>
    axios.post<any>(`/UniteOfMeasurement/GetList`, param, { withCredentials: true }),
  update: (PositionTitle: IUnitOfMeasure) =>
    requests.put<void>(`/UniteOfMeasurement/${PositionTitle.id}`, PositionTitle),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/UniteOfMeasurement/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/UniteOfMeasurement/GetDropDownList/${departmentId}`, { withCredentials: true }),
};
// Investor
const Investor = {
  create: (expenseType: IInvestor) => requests.post<void>('/Investor', expenseType),
  getList: (param: IInvestorParams) =>
    axios.post<any>(`/IInvestor/GetList`, param, { withCredentials: true }),
  update: (PositionTitle: IInvestor) =>
    requests.put<void>(`/IInvestor/${PositionTitle.id}`, PositionTitle),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/IInvestor/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/IInvestor/GetDropDownList/${departmentId}`, { withCredentials: true }),
};
//  Expense Type
const  ExpenseType= {
  create: (expenseType: IExpenseType) => requests.post<void>('/ExpenseType', expenseType),
  getList: (param: IExpenseTypeParams) =>
    axios.post<any>(`/ExpenseType/GetList`, param, { withCredentials: true }),
  update: (PositionTitle: IExpenseType) =>
    requests.put<void>(`/ExpenseType/${PositionTitle.id}`, PositionTitle),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/ExpenseType/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/ExpenseType/GetDropDownList/${departmentId}`, { withCredentials: true }),
};

// Supplier
const Supplier = {
  create: (Supplier: ISupplier) => requests.post<void>('/Supplier', Supplier),
  getList: (param: ISupplierParams) =>
    axios.post<any>(`/Supplier/GetList`, param, { withCredentials: true }),
  update: (Supplier: ISupplier) =>
    requests.put<void>(`/Supplier/${Supplier.id}`, Supplier),
  delete: (id: number, remark: string) =>
    axios.delete<void>(`/Supplier/${id}`, { data: remark }),
  DDl: (departmentId: any) =>
    axios.get<any>(`/Supplier/GetDropDownList/${departmentId}`, { withCredentials: true }),
};

const agent = {
  Logins,
  Permissions,
  ControllerNames,
  Lanugages,
  RolesAgent,
  createUser,
  Years,
  Notification,
  changeLanguage,
  Employees,
  EmployeesPosition,
  PositionTitle,
  JobPosition,
  Country,
  GetActiveEmp,
  GetParentEmp,
  province,
  district,
  ContractType,
  ContractDetails,
  Branch,
  UniteOfMeasure,
  ExpenseType,
  Investor,
  Customer,
  Supplier
};

export default agent;
