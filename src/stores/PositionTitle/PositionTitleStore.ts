import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { IPositionTitle, IPositionTitleParams } from 'src/@types/foamCompanyTypes/PositionTitle';
export default class PositionTitleStore {
  openDialog = false;

  PositionTitleRegistry = new Map<number, IPositionTitle>();

  editMode = false; //When click on edit button

  selectedPositionTitle: IPositionTitle | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get PositionTitleList() {
    return Array.from(this.PositionTitleRegistry.values());
  }

  setPositionTitleList = (PositionTitle: IPositionTitle) => {
    this.PositionTitleRegistry.set(PositionTitle.id!, PositionTitle);
  };

  //Pagination
  loadPositionTitle = async (params: IPositionTitleParams) => {
   // this.PositionTitleRegistry.clear();
    try {
      const result = await agent.PositionTitle.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setPositionTitleList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  PositionTitleSearch = async (params: IPositionTitleParams) => {
    this.PositionTitleRegistry.clear();
    this.loadPositionTitle(params);
  };

  getPositionTitleFromRegistry = (id: number) => {
    let PositionTitle = this.PositionTitleRegistry.get(id);
    if (PositionTitle) {
      this.editMode = true;
      this.selectedPositionTitle = PositionTitle;
    }
  };

  clearSelectedPositionTitle = () => {
    this.editMode = false;
    this.selectedPositionTitle = undefined;
  };

  deletePositionTitle = async (id: number, remark?: string) => {
    try {
      await agent.PositionTitle.delete(id, remark!);
      runInAction(() => {
        this.PositionTitleRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createPositionTitle = async (PositionTitle: IPositionTitle) => {
    try {
      await agent.PositionTitle.create(PositionTitle);
      runInAction(() => {
        this.loadPositionTitle({ pageIndex: 0, pageSize: 5 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  updatePositionTitle = async (PositionTitle: IPositionTitle) => {
    try {
      await agent.PositionTitle.update(PositionTitle);

      runInAction(() => {
        this.loadPositionTitle({ pageIndex: 0, pageSize: 5 });
        this.PositionTitleRegistry.delete(PositionTitle.id!);
        this.PositionTitleRegistry.set(PositionTitle.id!, PositionTitle);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
