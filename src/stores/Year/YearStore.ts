import { async } from '@firebase/util';
import { makeAutoObservable, runInAction } from 'mobx';
// import { ProcessStatus, ProcessStatusParams } from '../../@types/processStatus';
import { YearInterface, YearParams } from '../../@types/Year';
import agentYear from 'src/api/agent';

export default class YearStore {
  openDialog = false;

  //YearRegistry = new Map<number, YearInterface>();
  YearRegistry: YearInterface[] = [];

  editMode = false; //When click on edit button

  selectedYear: YearInterface | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get YearList() {
    return Array.from(this.YearRegistry.values());
  }

  setYearList = (Year: YearInterface) => {
    this.YearRegistry.push(Year);
  };

  //Pagination
  loadYear = async (params: YearParams) => {
    try {
      const result = await agentYear.Years.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;

        if (params.pageIndex === 0) {
          this.YearRegistry = result.data.data.slice();
        } else {
        result.data.data.forEach((lst: any) => {
          this.setYearList(lst);
        });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  YearSearch = async (params: YearParams) => {
    //this.YearRegistry.clear();
    this.loadYear(params);
  };

  getYearFromRegistry = (id: number) => {
    let Year = this.YearRegistry.find((Year) => Year.id === id);
    if (Year) {
      this.editMode = true;
      this.selectedYear = Year;
    }
  };

  clearSelectedYear = () => {
    this.editMode = false;
    this.selectedYear = undefined;
  };

  deleteYear = async (id: number, remark?: string) => {
    try {
      await agentYear.Years.delete(id, remark!);
      runInAction(() => {
        const index = this.YearRegistry.findIndex((Year) => Year.id === id);
        if(index !== -1){
          this.YearRegistry.splice(index,1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createYear = async (Year: YearInterface) => {
    await agentYear.Years.create(Year);
    runInAction(() => {
      this.loadYear({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateYear = async (Year: YearInterface) => {
    await agentYear.Years.update(Year);
    runInAction(() => {
      const index = this.YearRegistry.findIndex((Year) => Year.id === Year.id);
      if (index !== -1) {
        this.YearRegistry.splice(index, 1, Year);
        this.loadYear({ pageIndex: 0, pageSize: 5 });
      }
    });
  };
}
