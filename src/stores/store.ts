import { createContext, useContext } from 'react';
import LoginStore from './Login/loginStore';
import CommonStore from './commonStore';
import PermissionStore from './permissionStore';
import LanguageStore from './languageStore';
import RoleStore from './roleStore/roleStore';
import UserStore from './userStore/userStore';

// Archive

import YearStore from './Year/YearStore';
import commonDropdown from './CommonDropdwon/commonDropdown';

import userPerformenceDashboardStore from './userPerformenceDashboard/userPerformenceDashboardStore';

import EmployeePositionStore from './EmployeePosition/EmployeePositionStore';
import EmployeeStore from './Employee/EmployeeStore';

import userDashboardStore from './userDashboard/userDashboardStore';
import ProvinceStore from './Province/ProvinceStore';

import DistrictStore from './District/DistrictStore';
import ContractTypeStore from './ContractType/ContractTypeStore';

import ContractDetailsStore from './ContractDetails/ContractDetailsStore';

import PositionTitleStore from './PositionTitle/PositionTitleStore';
import JobPositionStore from './JobPosition/JobPositionStore';
import branchStore from './foamCompanyStores/branchStore';
import uniteOfMeasureStore from './foamCompanyStores/uniteOfMeasureStore';
import ExpenseTypeStore from './foamCompanyStores/ExpenseTypeStore';
import investorStore from './foamCompanyStores/investorStore';
import customerStore from './foamCompanyStores/customerStore';
import supplierStore from './foamCompanyStores/supplierStore';


interface Store {
  LoginStore: LoginStore;
  CommonStore: CommonStore;
  PermissionStore: PermissionStore;
  LanguageStore: LanguageStore;
  RoleStore: RoleStore;
  UserStore: UserStore;

  //Archive
  YearStore: YearStore;

  // Common Drop Down For All System
  commonDropdown: commonDropdown;



  // user Performence Dashboard and Report
  userPerformenceDashboardStore: userPerformenceDashboardStore;

  // Reception Reports

  // Employee
  EmployeeStore: EmployeeStore;
  //Employee Position
  EmployeePositionStore: EmployeePositionStore;


  ContractDetailsStore: ContractDetailsStore;
  
  // User Dashboard
  userDashboardStore: userDashboardStore;

  // Province
  ProvinceStore: ProvinceStore;
  // District
  DistrictStore: DistrictStore;


  //ContractType
  ContractTypeStore: ContractTypeStore;

  PositionTitleStore: PositionTitleStore;

  JobPositionStore: JobPositionStore;

  // Foam Company Stores
  branchStore:branchStore;
  uniteOfMeasureStore:uniteOfMeasureStore;
  ExpenseTypeStore:ExpenseTypeStore;
  investorStore:investorStore;
  customerStore:customerStore;
  supplierStore:supplierStore;
}
//Include All store below
export const store: Store = {
  LoginStore: new LoginStore(),
  CommonStore: new CommonStore(),
  commonDropdown: new commonDropdown(),
  PermissionStore: new PermissionStore(),
  LanguageStore: new LanguageStore(),
  RoleStore: new RoleStore(),
  UserStore: new UserStore(),
  //Archive
  YearStore: new YearStore(),
  userPerformenceDashboardStore: new userPerformenceDashboardStore(),

  //Employee
  EmployeeStore: new EmployeeStore(),
  EmployeePositionStore: new EmployeePositionStore(),
  ContractDetailsStore: new ContractDetailsStore(),

  // User Dashboardstore
  userDashboardStore: new userDashboardStore(),


  // PMIS
  ProvinceStore: new ProvinceStore(),
  DistrictStore: new DistrictStore(),


  //ContractType
  ContractTypeStore: new ContractTypeStore(),

  PositionTitleStore: new PositionTitleStore(),

  JobPositionStore: new JobPositionStore(),
// Foam Company Stores 
branchStore: new branchStore(),
uniteOfMeasureStore: new uniteOfMeasureStore(),
ExpenseTypeStore: new ExpenseTypeStore(),
investorStore: new investorStore(),
customerStore: new customerStore(),
supplierStore: new supplierStore(),

};

export const StoreContext = createContext(store);
export function useStore() {
  return useContext(StoreContext);
}
