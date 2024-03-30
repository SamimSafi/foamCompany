import { async } from '@firebase/util';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { IEmployeePosition, IEmployeePositionParams } from 'src/@types/EmployeePosition';
export default class EmployeePositionStore {
  openDialog = false;

  EmployeePositionRegistry = new Map<number, IEmployeePosition>();

  editMode = false; //When click on edit button

  selectedEmployeePosition: IEmployeePosition | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get EmployeePositionList() {
    return Array.from(this.EmployeePositionRegistry.values());
  }

  setEmployeePositionList = (proStatus: IEmployeePosition) => {
    this.EmployeePositionRegistry.set(proStatus.id!, proStatus);
  };

  //Pagination
  loadEmployeePosition = async (params: IEmployeePositionParams) => {
    // this.EmployeePositionRegistry.clear();
    try {
      //const result = await agent.EmployeesPosition.getList(params);
      // runInAction(() => {
      //   this.totalRecord = result.data.totalRecord;
      //   result.data.data.forEach((lst: any) => {
      //     this.setEmployeePositionList(lst);
      //   });
      // });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  EmployeePositionSearch = async (params: IEmployeePositionParams) => {
    this.EmployeePositionRegistry.clear();
    this.loadEmployeePosition(params);
  };

  getEmployeePositionFromRegistry = (id: number) => {
    let proStatus = this.EmployeePositionRegistry.get(id);
    if (proStatus) {
      this.editMode = true;
      this.selectedEmployeePosition = proStatus;
    }
  };

  clearSelectedEmployeePosition = () => {
    this.editMode = false;
    this.selectedEmployeePosition = undefined;
  };

  deleteEmployeePosition = async (id: number, remark?: string) => {
    try {
    //  await agent.EmployeesPosition.delete(id, remark!);
      runInAction(() => {
        this.EmployeePositionRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createEmployeePosition = async (proStatus: IEmployeePosition) => {
    try {
     // await agent.EmployeesPosition.create(proStatus);
      runInAction(() => {
        this.loadEmployeePosition({ pageIndex: 0, pageSize: 5 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateEmployeePosition = async (proStatus: IEmployeePosition) => {
    try {
     // await agent.EmployeesPosition.update(proStatus);

      runInAction(() => {
        this.loadEmployeePosition({ pageIndex: 0, pageSize: 5 });
        this.EmployeePositionRegistry.delete(proStatus.id!);
        this.EmployeePositionRegistry.set(proStatus.id!, proStatus);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
