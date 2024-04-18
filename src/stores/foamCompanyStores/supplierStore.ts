import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agentSupplier from '../../api/agent';
import { ISupplier, ISupplierParams } from 'src/@types/foamCompanyTypes/Supplier';

export default class supplierStore {
  openDialog = false;

  SupplierRegistry = new Map<number, ISupplier>();

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedSupplier: ISupplier | undefined;

  totalRecord: number = 0;

  SupplierTypeOption: SelectControl[] = []; // for Supplier Type Dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get SupplierList() {
    return Array.from(this.SupplierRegistry.values());
  }

  setSupplierList = (Cupboard: ISupplier) => {
    this.SupplierRegistry.set(Cupboard.id!, Cupboard);
  };

  //Pagination
  loadSupplier = async (params: ISupplierParams) => {
    try {
      const result = await agentSupplier.Supplier.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        result.data.data.forEach((lst: any) => {
          this.setSupplierList(lst);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  Supplierearch = async (params: ISupplierParams) => {
    this.SupplierRegistry.clear();
    this.loadSupplier(params);
  };

  getSupplierFromRegistry = (id: number) => {
    let dep = this.SupplierRegistry.get(id);

    if (dep) {
      this.editMode = true;
      this.selectedSupplier = dep;
    }
  };

  clearSelectedSupplier = () => {
    this.editMode = false;
    this.selectedSupplier = undefined;
  };

  deleteSupplier = async (id: number, remark?: string) => {
    try {
      await agentSupplier.Supplier.delete(id, remark!);
      runInAction(() => {
        this.SupplierRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  setDetailCloseDialog = () => (this.openDetailDialog = !this.openDetailDialog);

  createSupplier = async (Supplier: ISupplier) => {
    await agentSupplier.Supplier.create(Supplier, Supplier.profilePhoto);
    runInAction(() => {
      this.loadSupplier({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateSupplier = async (Supplier: ISupplier) => {
    await agentSupplier.Supplier.update(Supplier, Supplier.profilePhoto);
    runInAction(() => {
      this.loadSupplier({ pageIndex: 0, pageSize: 5 });
      this.SupplierRegistry.delete(Supplier.id!);
      this.SupplierRegistry.set(Supplier.id!, Supplier);
    });
  };

  // loadSupplierTypeDropdown = async () => {
  //   try {
  //     const result = await agentSupplier.SupplierTypes.SupplierTypeDDL();
  //     this.setSupplierTypeOptions(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // setSupplierTypeOptions = (data: SupplierTypeDDLDropdown[]) => {
  //   const op = data.map((op) => {
  //     const optRow = {
  //       text: op.name,
  //       value: op.id,
  //     };
  //     return optRow;
  //   });
  //   this.SupplierTypeOption = op;
  // };
}
