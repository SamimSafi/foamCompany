import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from '../../@types/common';
import agentExpense from '../../api/agent';
import { IExpense, IExpenseParams } from '../../@types/foamCompanyTypes/Expense';

export default class ExpenseStore {
  openDialog = false;

  ExpenseRegistry = new Map<number, IExpense>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedExpense: IExpense | undefined;

  totalRecord: number = 0;

  ExpenseOption: SelectControl[] = []; // for Expense Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get ExpenseList() {
    return Array.from(this.ExpenseRegistry.values());
  }

  setExpenseList = (Cupboard: IExpense) => {
    this.ExpenseRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadExpense = async (params: IExpenseParams) => {
    try {
      const result = await agentExpense.Expense.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setExpenseList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentExpense.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadExpense({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  Expenseearch = async (params: IExpenseParams) => {
    this.ExpenseRegistry.clear();
    this.loadExpense(params);
  };

  getExpenseFromRegistry = (id: number) => {
    let dep = this.ExpenseRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedExpense = dep;
    }
  };

  clearSelectedExpense = () => {
    this.editMode = false;
    this.selectedExpense = undefined;
  };

  deleteExpense = async (id: number, remark?: string) => {
    try {
      await agentExpense.Expense.delete(id, remark!);
      runInAction(() => {
        this.ExpenseRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createExpense = async (Expense: IExpense) => {
    await agentExpense.Expense.create(Expense);
    runInAction(() => {
      this.loadExpense({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateExpense = async (Expense: IExpense) => {
    await agentExpense.Expense.update(Expense);
    runInAction(() => {
      this.loadExpense({ pageIndex: 0, pageSize: 5 });
      this.ExpenseRegistry.delete(Expense.id!);
      this.ExpenseRegistry.set(Expense.id!, Expense);
    });
  };

  // loadExpenseDropdown = async () => {
  //   try {
  //     const result = await agentExpense.Expenses.ExpenseDDL();
  //     this.setExpenseOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setExpenseOptions = (data: ExpenseDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.ExpenseOption = op;
  // };
}
