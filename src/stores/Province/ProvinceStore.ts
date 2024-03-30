import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { Province, ProvinceParams } from 'src/@types/province';

export default class ProvinceStore {
  openDialog = false;

  ProvinceRegistry: Province[]=[];

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedProvince: Province | undefined = undefined;

  selectedProvinceDetail: Province | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get ProvinceList() {
    return Array.from(this.ProvinceRegistry.values());
  }

  setProvinceList = (Province: Province) => {
    this.ProvinceRegistry.push(Province);
  };

  //Pagination
  loadProvince = async (params: ProvinceParams) => {
    // this.ProvinceRegistry.clear();
    try {
      const result = await agent.province.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;

        if (params.pageIndex === 0) {
          this.ProvinceRegistry = result.data.data.slice();
        } else {
          result.data.data.forEach((lst: any) => {
            
            this.setProvinceList(lst);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  ProvinceSearch = async (params: ProvinceParams) => {
    this.loadProvince(params);
  };

  getProvinceRegistry = (id: number) => {
    let region = this.ProvinceRegistry.find((Province) => Province.id === id);

    // console.log(dep);
    if (region) {
      this.editMode = true;
      this.selectedProvince = region;
    }
  };

  clearSelectedProvince = () => {
    this.editMode = false;
    this.selectedProvince = undefined;
    this.selectedProvinceDetail = undefined;
  };

  deleteProvince = async (id: number, remark?: string) => {
    try {
      await agent.province.delete(id, remark!);
      runInAction(() => {
        const index = this.ProvinceRegistry.findIndex((province) => province.id === id);
        if(index !== -1){
          this.ProvinceRegistry.splice(index,1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createProvince = async (Province: Province) => {
    await agent.province.create(Province);
    runInAction(() => {
      this.loadProvince({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateProvince = async (Province: Province) => {
    await agent.province.update(Province);

    runInAction(() => {
      const index = this.ProvinceRegistry.findIndex((province) => province.id === Province.id);
      if (index !== -1) {
        this.ProvinceRegistry.splice(index, 1, Province);
        this.loadProvince({ pageIndex: 0, pageSize: 5 });
      }
    });
  };

}
