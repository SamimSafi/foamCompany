import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../../api/agent';
import { District, DistrictParams } from 'src/@types/district';

export default class DistrictStore {
  openDialog = false;

  //DistrictRegistry = new Map<number, District>();
  DistrictRegistry: District[] = [];

  openDetailDialog = false;

  editMode = false; //When click on edit button

  selectedDistrict: District | undefined = undefined;

  selectedDistrictDetail: District | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get DistrictList() {
    return Array.from(this.DistrictRegistry.values());
  }

  setDistrictList = (District: District) => {
    this.DistrictRegistry.push(District);
  };

  //Pagination
  loadDistrict = async (params: DistrictParams) => {
   
    try {
      const result = await agent.district.getList(params);

      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        if (params.pageIndex === 0) {
          this.DistrictRegistry = result.data.data.slice();
        } else {
        result.data.data.forEach((lst: any) => {
          this.setDistrictList(lst);
        });
      }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  DistrictSearch = async (params: DistrictParams) => {
    //this.DistrictRegistry.clear();
    this.loadDistrict(params);
  };

  getDistrictRegistry = (id: number) => {
    let district = this.DistrictRegistry.find((district) => district.id === id);
    // console.log(dep);
    if (district) {
      this.editMode = true;
      this.selectedDistrict = district;
    }
  };

  clearSelectedDistrict = () => {
    this.editMode = false;
    this.selectedDistrict = undefined;
    this.selectedDistrictDetail = undefined;
  };

  deleteDistrict = async (id: number, remark?: string) => {
    try {
      await agent.district.delete(id, remark!);
      runInAction(() => {
        const index = this.DistrictRegistry.findIndex((district) => district.id === id);
        if(index !== -1){
          this.DistrictRegistry.splice(index,1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createDistrict = async (District: District) => {
    await agent.district.create(District);
    runInAction(() => {
      this.loadDistrict({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateDistrict = async (District: District) => {
    await agent.district.update(District);

    runInAction(() => {
      const index = this.DistrictRegistry.findIndex((district) => district.id === district.id);
      if (index !== -1) {
        this.DistrictRegistry.splice(index, 1, District);
        this.loadDistrict({ pageIndex: 0, pageSize: 5 });
      }
    });
  };

  loadDistrictDetail = async (id: number) => {
    try {
      const axiosResponse = await agent.district.districtDetail(id);
      runInAction(() => {
        this.selectedDistrictDetail = axiosResponse.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
