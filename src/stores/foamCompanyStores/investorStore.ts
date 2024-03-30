import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentInvestor from '../../api/agent';
import { IInvestor, IInvestorParams } from 'src/@types/foamCompanyTypes/investor';

export default class investorStore {
  openDialog = false;

  InvestorRegistry = new Map<number, IInvestor>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedInvestor: IInvestor | undefined;

  totalRecord: number = 0;

  InvestorTypeOption: SelectControl[] = []; // for Investor Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get InvestorList() {
    return Array.from(this.InvestorRegistry.values());
  }

  setInvestorList = (Cupboard: IInvestor) => {
    this.InvestorRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadInvestor = async (params: IInvestorParams) => {
    try {
      const result = await agentInvestor.Investor.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setInvestorList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentInvestor.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadInvestor({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  Investorearch = async (params: IInvestorParams) => {
    this.InvestorRegistry.clear();
    this.loadInvestor(params);
  };

  getInvestorFromRegistry = (id: number) => {
    let dep = this.InvestorRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedInvestor = dep;
    }
  };

  clearSelectedInvestor = () => {
    this.editMode = false;
    this.selectedInvestor = undefined;
  };

  deleteInvestor = async (id: number, remark?: string) => {
    try {
      await agentInvestor.Investor.delete(id, remark!);
      runInAction(() => {
        this.InvestorRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createInvestor = async (Investor: IInvestor) => {
      await agentInvestor.Investor.create(Investor);
      runInAction(() => {
        this.loadInvestor({ pageIndex: 0, pageSize: 5 });
      });
  };

  updateInvestor = async (Investor: IInvestor) => {
      await agentInvestor.Investor.update(Investor);
      runInAction(() => {
        this.loadInvestor({ pageIndex: 0, pageSize: 5 });
        this.InvestorRegistry.delete(Investor.id!);
        this.InvestorRegistry.set(Investor.id!, Investor);
      });
  };

  // loadInvestorTypeDropdown = async () => {
  //   try {
  //     const result = await agentInvestor.InvestorTypes.InvestorTypeDDL();
  //     this.setInvestorTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setInvestorTypeOptions = (data: InvestorTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.InvestorTypeOption = op;
  // };
}
