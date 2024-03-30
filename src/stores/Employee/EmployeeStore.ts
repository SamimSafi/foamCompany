import { baseUrl } from 'src/api/baseUrl';
import { async } from '@firebase/util';
import { makeAutoObservable, runInAction } from 'mobx';

import agent from '../../api/agent';

import {
  EmployeeAccountReport,
  EmployeeAccountReportResult,
  IEmployee,
  IEmployeeDetails,
  IEmployeeForEdit,
  IEmployeeParams,
} from 'src/@types/foamCompanyTypes/Employee';
export default class EmployeeStore {
  openDialog = false;

  //EmployeeRegistry = new Map<number, IEmployee>();
  EmployeeRegistry: IEmployee[] = [];

  editMode = false; //When click on edit button

  selectedEmployee: IEmployee | undefined = undefined;

  employeeForEdit: IEmployeeForEdit | undefined = undefined;

  SelectedEmployeeDetail: IEmployeeDetails | undefined;

  EmployeeReportResult: EmployeeAccountReportResult[] = [];

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get EmployeeList() {
    return Array.from(this.EmployeeRegistry.values());
  }

  setEmployeeList = (Employee: IEmployee) => {
    this.EmployeeRegistry.push(Employee);
  };

  //Pagination
  loadEmployee = async (params: IEmployeeParams) => {
    try {
      const result = await agent.Employees.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        if (params.pageIndex === 0) {
          this.EmployeeRegistry = result.data.data.slice();
        } else {
        result.data.data.forEach((lst: any) => {
          this.setEmployeeList(lst);
        });
      }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadEmployeeDetail = async (id: number) => {
    try {
      const axiosResponse = await agent.Employees.employeeDetail(id);

      runInAction(() => {
        this.SelectedEmployeeDetail = axiosResponse;
      });
    } catch (error) {
      console.log(error);
    }
  };


  loadEmployeeAccountReport = async (reportParams: EmployeeAccountReport) => {
    try {
      const axiosResponse = await agent.Employees.getEmployeeAccountReport(reportParams);

      runInAction(() => {
        this.EmployeeReportResult = axiosResponse.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  getEmpForEdit = async (id: any) => {
    try {
      const result = await agent.Employees.getEmpForEdit(id);
      const newData={...result.data,profilePhoto:baseUrl+result.data.photoPath}
      this.employeeForEdit = newData;
      this.editMode = true;
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  EmployeeSearch = async (params: IEmployeeParams) => {
    //this.EmployeeRegistry.clear();
    this.loadEmployee(params);
  };

  getEmployeeFromRegistry = (id: number) => {
    let Employee = this.EmployeeRegistry.find((employee) => employee.id === id);
    localStorage.setItem('DetailsData', JSON.stringify(Employee));
    if (Employee) {
      this.editMode = true;
      this.selectedEmployee = Employee;
    }
  };

  clearSelectedEmployee = () => {
    this.editMode = false;
    this.employeeForEdit = undefined;
    this.selectedEmployee = undefined;
  };

  deleteEmployee = async (id: number, remark?: string) => {
    try {
      await agent.Employees.delete(id, remark!);
      runInAction(() => {
        const index = this.EmployeeRegistry.findIndex((employee) => employee.id === id);
        if (index !== -1) {
          this.EmployeeRegistry.splice(index, 1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createEmployee = async (Employee: IEmployee) => {
    await agent.Employees.create(Employee, Employee.profilePhoto!).then((res) => {
      console.log(res);
    });

    runInAction(() => {
      this.loadEmployee({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateEmployee = async (Employee: IEmployee) => {
    console.log(Employee);
    await agent.Employees.update(Employee, Employee.profilePhoto!);

    runInAction(() => {
      const index = this.EmployeeRegistry.findIndex((employee) => employee.id === Employee.id);
      if (index !== -1) {
        this.EmployeeRegistry.splice(index, 1, Employee);
        this.loadEmployee({ pageIndex: 0, pageSize: 5 });
      }
    });
  };
}
