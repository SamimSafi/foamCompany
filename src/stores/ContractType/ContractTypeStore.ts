
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';


import { IContractType, IContractTypeParams } from 'src/@types/foamCompanyTypes/ContractType';
export default class ContractTypeStore {
  openDialog = false;

  ContractTypeRegistry = new Map<number, IContractType>();

  editMode = false; //When click on edit button

  selectedContractType: IContractType | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get ContractTypeList() {
    return Array.from(this.ContractTypeRegistry.values());
  }

  setContractTypeList = (ContractType: IContractType) => {
    this.ContractTypeRegistry.set(ContractType.id!, ContractType);
  };

  //Pagination
  loadContractType = async (params: IContractTypeParams) => {
   // this.ContractTypeRegistry.clear();
    try {
      const result = await agent.ContractType.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setContractTypeList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  ContractTypeSearch = async (params: IContractTypeParams) => {
    this.ContractTypeRegistry.clear();
    this.loadContractType(params);
  };

  getContractTypeFromRegistry = (id: number) => {
    let ContractType = this.ContractTypeRegistry.get(id);
    if (ContractType) {
      this.editMode = true;
      this.selectedContractType = ContractType;
    }
  };

  clearSelectedContractType = () => {
    this.editMode = false;
    this.selectedContractType = undefined;
  };

  deleteContractType = async (id: number, remark?: string) => {
    try {
      await agent.ContractType.delete(id, remark!);
      runInAction(() => {
        this.ContractTypeRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createContractType = async (ContractType: IContractType) => {
    try {
      await agent.ContractType.create(ContractType);
      runInAction(() => {
        this.loadContractType({ pageIndex: 0, pageSize: 5 });
        //After Creating it should clear form data
        this.clearSelectedContractType();
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateContractType = async (ContractType: IContractType) => {
    try {
      await agent.ContractType.update(ContractType);

      runInAction(() => {
        this.loadContractType({ pageIndex: 0, pageSize: 5 });
        this.ContractTypeRegistry.delete(ContractType.id!);
        this.ContractTypeRegistry.set(ContractType.id!, ContractType);
        //After Updating it should clear form data
        this.clearSelectedContractType();
      });
    } catch (error) {
      console.log(error);
    }
  };
}
