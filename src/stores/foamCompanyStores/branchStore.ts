import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentBranch from '../../api/agent';
import { IBranch, IBranchParams } from 'src/@types/foamCompanyTypes/branch';

export default class Branchtore {
  openDialog = false;

  BranchRegistry = new Map<number, IBranch>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedBranch: IBranch | undefined;

  totalRecord: number = 0;

  BranchTypeOption: SelectControl[] = []; // for Branch Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get BranchList() {
    return Array.from(this.BranchRegistry.values());
  }

  setBranchList = (Cupboard: IBranch) => {
    this.BranchRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadBranch = async (params: IBranchParams) => {
    try {
      const result = await agentBranch.Branch.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setBranchList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Detail Infomation
  // DetailOfCupboard = async (Cupboard: Cupboard) => {
  //   try {
  //     await agentBranch.Cupboards.detail(Cupboard);
  //     runInAction(() => {
  //       this.loadBranch({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  Branchearch = async (params: IBranchParams) => {
    this.BranchRegistry.clear();
    this.loadBranch(params);
  };

  getBranchFromRegistry = (id: number) => {
    let dep = this.BranchRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedBranch = dep;
    }
  };

  clearSelectedBranch = () => {
    this.editMode = false;
    this.selectedBranch = undefined;
  };

  deleteBranch = async (id: number, remark?: string) => {
    try {
      await agentBranch.Branch.delete(id, remark!);
      runInAction(() => {
        this.BranchRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createBranch = async (Branch: IBranch) => {
      await agentBranch.Branch.create(Branch);
      runInAction(() => {
        this.loadBranch({ pageIndex: 0, pageSize: 5 });
      });
  };

  updateBranch = async (Branch: IBranch) => {
      await agentBranch.Branch.update(Branch);
      runInAction(() => {
        this.loadBranch({ pageIndex: 0, pageSize: 5 });
        this.BranchRegistry.delete(Branch.id!);
        this.BranchRegistry.set(Branch.id!, Branch);
      });
  };

  // loadBranchTypeDropdown = async () => {
  //   try {
  //     const result = await agentBranch.BranchTypes.BranchTypeDDL();
  //     this.setBranchTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setBranchTypeOptions = (data: BranchTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.BranchTypeOption = op;
  // };
}
