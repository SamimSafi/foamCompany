import { async } from '@firebase/util';
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { IContractDetails, IContractDetailsParams } from 'src/@types/foamCompanyTypes/ContractDetails';
export default class ContractDetailsStore {
  openDialog = false;

  ContractDetailsRegistry = new Map<number, IContractDetails>();

  editMode = false; //When click on edit button

  selectedContractDetails: IContractDetails | undefined = undefined;

  EmpCurrentContractDetails: IContractDetails | undefined = undefined;

  totalRecord: number = 0;

  ID: any = localStorage.getItem('id');

  constructor() {
    makeAutoObservable(this);
  }

  get ContractDetailsList() {
    return Array.from(this.ContractDetailsRegistry.values());
  }

  setContractDetailsList = (ContractDetails: IContractDetails) => {
    this.ContractDetailsRegistry.set(ContractDetails.id!, ContractDetails);
  };

  //Pagination
  loadContractDetails = async (params: IContractDetailsParams, EmpId: any) => {

    try {
      const result = await agent.ContractDetails.getList(params, EmpId);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setContractDetailsList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  ContractDetailsSearch = async (params: IContractDetailsParams) => {
    this.ContractDetailsRegistry.clear();
    this.loadContractDetails(params, this.ID);
  };

  //get current contract of employee

  getEmpCurrentContract = async (id: any) => {
    try {
      const result = await agent.ContractDetails.getEmpCurrentContract(id);
      console.log(result);
      this.EmpCurrentContractDetails = result.data;
    } catch (error) {
      console.log(error);
    }
  };

  getContractDetailsFromRegistry = (id: number) => {
    let ContractDetails = this.ContractDetailsRegistry.get(id);
    if (ContractDetails) {
      this.editMode = true;
      this.selectedContractDetails = ContractDetails;
    }
  };

  clearSelectedContractDetails = () => {
    this.editMode = false;
    this.selectedContractDetails = undefined;
  };

  clearSelectedCurrentContractDetails = () => {
    this.editMode = false;
    this.EmpCurrentContractDetails = undefined;
  };

  deleteContractDetails = async (id: number, remark?: string) => {
    try {
      await agent.ContractDetails.delete(id, remark!);
      runInAction(() => {
        this.ContractDetailsRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createContractDetails = async (ContractDetails: IContractDetails) => {
    await agent.ContractDetails.create(ContractDetails);
    runInAction(() => {
      this.loadContractDetails({ pageIndex: 0, pageSize: 5 }, this.ID);
    });
  };

  updateContractDetails = async (ContractDetails: IContractDetails) => {
    await agent.ContractDetails.update(ContractDetails);

    runInAction(() => {
      this.loadContractDetails({ pageIndex: 0, pageSize: 5 }, this.ID);
      this.ContractDetailsRegistry.delete(ContractDetails.id!);
      this.ContractDetailsRegistry.set(ContractDetails.id!, ContractDetails);
    });
  };
}
