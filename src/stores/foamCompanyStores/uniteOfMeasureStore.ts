import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentuniteOfMeasure from '../../api/agent';
import { IUnitOfMeasure,IUnitOfMeasureParams } from 'src/@types/foamCompanyTypes/unitOfMeasure';

export default class uniteOfMeasureStore {
  openDialog = false;

  uniteOfMeasureRegistry = new Map<number, IUnitOfMeasure>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selecteduniteOfMeasure: IUnitOfMeasure | undefined;

  totalRecord: number = 0;

  uniteOfMeasureTypeOption: SelectControl[] = []; // for uniteOfMeasure Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get uniteOfMeasureList() {
    return Array.from(this.uniteOfMeasureRegistry.values());
  }

  setuniteOfMeasureList = (Cupboard: IUnitOfMeasure) => {
    this.uniteOfMeasureRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loaduniteOfMeasure = async (params: IUnitOfMeasureParams) => {
    try {
      const result = await agentuniteOfMeasure.UniteOfMeasure.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setuniteOfMeasureList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentuniteOfMeasure.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loaduniteOfMeasure({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  uniteOfMeasureearch = async (params: IUnitOfMeasureParams) => {
    this.uniteOfMeasureRegistry.clear();
    this.loaduniteOfMeasure(params);
  };

  getuniteOfMeasureFromRegistry = (id: number) => {
    let dep = this.uniteOfMeasureRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selecteduniteOfMeasure = dep;
    }
  };

  clearSelecteduniteOfMeasure = () => {
    this.editMode = false;
    this.selecteduniteOfMeasure = undefined;
  };

  deleteuniteOfMeasure = async (id: number, remark?: string) => {
    try {
      await agentuniteOfMeasure.UniteOfMeasure.delete(id, remark!);
      runInAction(() => {
        this.uniteOfMeasureRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createuniteOfMeasure = async (uniteOfMeasure: IUnitOfMeasure) => {
      await agentuniteOfMeasure.UniteOfMeasure.create(uniteOfMeasure);
      runInAction(() => {
        this.loaduniteOfMeasure({ pageIndex: 0, pageSize: 5 });
      });
  };

  updateuniteOfMeasure = async (uniteOfMeasure: IUnitOfMeasure) => {
      await agentuniteOfMeasure.UniteOfMeasure.update(uniteOfMeasure);
      runInAction(() => {
        this.loaduniteOfMeasure({ pageIndex: 0, pageSize: 5 });
        this.uniteOfMeasureRegistry.delete(uniteOfMeasure.id!);
        this.uniteOfMeasureRegistry.set(uniteOfMeasure.id!, uniteOfMeasure);
      });
  };

  // loaduniteOfMeasureTypeDropdown = async () => {
  //   try {
  //     const result = await agentuniteOfMeasure.uniteOfMeasureTypes.uniteOfMeasureTypeDDL();
  //     this.setuniteOfMeasureTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setuniteOfMeasureTypeOptions = (data: uniteOfMeasureTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.uniteOfMeasureTypeOption = op;
  // };
}
