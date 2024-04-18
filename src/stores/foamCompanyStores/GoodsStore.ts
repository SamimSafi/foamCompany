import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentGoods from '../../api/agent';
import { IGoods, IGoodsParams } from '../../@types/foamCompanyTypes/Goods';

export default class GoodsStore {
  openDialog = false;

  GoodsRegistry = new Map<number, IGoods>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedGoods: IGoods | undefined;

  totalRecord: number = 0;

  GoodsTypeOption: SelectControl[] = []; // for Goods Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get GoodsList() {
    return Array.from(this.GoodsRegistry.values());
  }

  setGoodsList = (Cupboard: IGoods) => {
    this.GoodsRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadGoods = async (params: IGoodsParams) => {
    try {
      const result = await agentGoods.Goods.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setGoodsList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentGoods.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadGoods({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  Goodsearch = async (params: IGoodsParams) => {
    this.GoodsRegistry.clear();
    this.loadGoods(params);
  };

  getGoodsFromRegistry = (id: number) => {
    let dep = this.GoodsRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedGoods = dep;
    }
  };

  clearSelectedGoods = () => {
    this.editMode = false;
    this.selectedGoods = undefined;
  };

  deleteGoods = async (id: number, remark?: string) => {
    try {
      await agentGoods.Goods.delete(id, remark!);
      runInAction(() => {
        this.GoodsRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createGoods = async (Goods: IGoods) => {
    await agentGoods.Goods.create(Goods);
    runInAction(() => {
      this.loadGoods({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateGoods = async (Goods: IGoods) => {
    await agentGoods.Goods.update(Goods);
    runInAction(() => {
      this.loadGoods({ pageIndex: 0, pageSize: 5 });
      this.GoodsRegistry.delete(Goods.id!);
      this.GoodsRegistry.set(Goods.id!, Goods);
    });
  };

  // loadGoodsTypeDropdown = async () => {
  //   try {
  //     const result = await agentGoods.GoodsTypes.GoodsTypeDDL();
  //     this.setGoodsTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setGoodsTypeOptions = (data: GoodsTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.GoodsTypeOption = op;
  // };
}
