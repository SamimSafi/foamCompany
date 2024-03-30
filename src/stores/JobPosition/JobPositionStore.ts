
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { IJobPosition, IJobPositionParams } from 'src/@types/JobPosition';
export default class JobPositionStore {
  openDialog = false;

  JobPositionRegistry = new Map<number, IJobPosition>();

  editMode = false; //When click on edit button

  selectedJobPosition: IJobPosition | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get JobPositionList() {
    return Array.from(this.JobPositionRegistry.values());
  }

  setJobPositionList = (JobPosition: IJobPosition) => {
    this.JobPositionRegistry.set(JobPosition.id!, JobPosition);
  };

  

  //Pagination
  loadJobPosition = async (params: IJobPositionParams) => {
   // this.JobPositionRegistry.clear();
    try {
      const result = await agent.JobPosition.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        const reversed=result.data.data.reverse();
        reversed.forEach((lst: any) => {
          this.setJobPositionList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  JobPositionSearch = async (params: IJobPositionParams) => {
    //this.JobPositionRegistry.clear();
    this.loadJobPosition(params);
  };

  getJobPositionFromRegistry = (id: number) => {
    let JobPosition = this.JobPositionRegistry.get(id);
    if (JobPosition) {
      this.editMode = true;
      this.selectedJobPosition = JobPosition;
    }
  };

  clearSelectedJobPosition = () => {
    this.editMode = false;
    this.selectedJobPosition = undefined;
  };

  deleteJobPosition = async (id: number, remark?: string) => {
    try {
      await agent.JobPosition.delete(id, remark!);
      runInAction(() => {
        this.JobPositionRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createJobPosition = async (JobPosition: IJobPosition) => {
    try {
      await agent.JobPosition.create(JobPosition);
      runInAction(() => {
        this.loadJobPosition({ pageIndex: 0, pageSize: 5 });
        this.clearSelectedJobPosition();
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateJobPosition = async (JobPosition: IJobPosition) => {
    try {
      await agent.JobPosition.update(JobPosition);

      runInAction(() => {
        this.loadJobPosition({ pageIndex: 0, pageSize: 5 });
        this.JobPositionRegistry.delete(JobPosition.id!);
        this.JobPositionRegistry.set(JobPosition.id!, JobPosition);
        this.clearSelectedJobPosition();

      });
    } catch (error) {
      console.log(error);
    }
  };
}
