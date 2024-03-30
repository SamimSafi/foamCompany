import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentExpenseType from '../../api/agent';
import { IExpenseType,IExpenseTypeParams } from '../../@types/foamCompanyTypes/expenseType';

export default class ExpenseTypeStore {
  openDialog = false;

  ExpenseTypeRegistry = new Map<number, IExpenseType>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedExpenseType: IExpenseType | undefined;

  totalRecord: number = 0;

  ExpenseTypeTypeOption: SelectControl[] = []; // for ExpenseType Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get ExpenseTypeList() {
    return Array.from(this.ExpenseTypeRegistry.values());
  }

  setExpenseTypeList = (Cupboard: IExpenseType) => {
    this.ExpenseTypeRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadExpenseType = async (params: IExpenseTypeParams) => {
    try {
      const result = await agentExpenseType.ExpenseType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setExpenseTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentExpenseType.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadExpenseType({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  ExpenseTypeearch = async (params: IExpenseTypeParams) => {
    this.ExpenseTypeRegistry.clear();
    this.loadExpenseType(params);
  };

  getExpenseTypeFromRegistry = (id: number) => {
    let dep = this.ExpenseTypeRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedExpenseType = dep;
    }
  };

  clearSelectedExpenseType = () => {
    this.editMode = false;
    this.selectedExpenseType = undefined;
  };

  deleteExpenseType = async (id: number, remark?: string) => {
    try {
      await agentExpenseType.ExpenseType.delete(id, remark!);
      runInAction(() => {
        this.ExpenseTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createExpenseType = async (ExpenseType: IExpenseType) => {
      await agentExpenseType.ExpenseType.create(ExpenseType);
      runInAction(() => {
        this.loadExpenseType({ pageIndex: 0, pageSize: 5 });
      });
  };

  updateExpenseType = async (ExpenseType: IExpenseType) => {
      await agentExpenseType.ExpenseType.update(ExpenseType);
      runInAction(() => {
        this.loadExpenseType({ pageIndex: 0, pageSize: 5 });
        this.ExpenseTypeRegistry.delete(ExpenseType.id!);
        this.ExpenseTypeRegistry.set(ExpenseType.id!, ExpenseType);
      });
  };

  // loadExpenseTypeTypeDropdown = async () => {
  //   try {
  //     const result = await agentExpenseType.ExpenseTypeTypes.ExpenseTypeTypeDDL();
  //     this.setExpenseTypeTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setExpenseTypeTypeOptions = (data: ExpenseTypeTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.ExpenseTypeTypeOption = op;
  // };
}
