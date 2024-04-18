import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentCustomer from '../../api/agent';
import { ICustomer, ICustomerParams } from 'src/@types/foamCompanyTypes/customer';

export default class customerStore {
  openDialog = false;

  CustomerRegistry = new Map<number, ICustomer>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedCustomer: ICustomer | undefined;

  totalRecord: number = 0;

  CustomerTypeOption: SelectControl[] = []; // for Customer Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get CustomerList() {
    return Array.from(this.CustomerRegistry.values());
  }

  setCustomerList = (Cupboard: ICustomer) => {
    this.CustomerRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadCustomer = async (params: ICustomerParams) => {
    try {
      const result = await agentCustomer.Customer.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setCustomerList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  Customerearch = async (params: ICustomerParams) => {
    this.CustomerRegistry.clear();
    this.loadCustomer(params);
  };

  getCustomerFromRegistry = (id: number) => {
    let dep = this.CustomerRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedCustomer = dep;
    }
  };

  clearSelectedCustomer = () => {
    this.editMode = false;
    this.selectedCustomer = undefined;
  };

  deleteCustomer = async (id: number, remark?: string) => {
    try {
      await agentCustomer.Customer.delete(id, remark!);
      runInAction(() => {
        this.CustomerRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createCustomer = async (Customer: ICustomer) => {
    await agentCustomer.Customer.create(Customer, Customer.profilePhoto);
    runInAction(() => {
      this.loadCustomer({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateCustomer = async (Customer: ICustomer) => {
    await agentCustomer.Customer.update(Customer, Customer.profilePhoto);
    runInAction(() => {
      this.loadCustomer({ pageIndex: 0, pageSize: 5 });
      this.CustomerRegistry.delete(Customer.id!);
      this.CustomerRegistry.set(Customer.id!, Customer);
    });
  };

  // loadCustomerTypeDropdown = async () => {
  //   try {
  //     const result = await agentCustomer.CustomerTypes.CustomerTypeDDL();
  //     this.setCustomerTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setCustomerTypeOptions = (data: CustomerTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.CustomerTypeOption = op;
  // };
}
