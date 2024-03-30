import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl, SelectControl3, SelectControl4 } from 'src/@types/common';
import {
  IPermision,
  IPermissionParams,
  IControllerNameDropdown,
  ISubControllerNameDropdown,
  IApplicationDropdown,
  ICascadingDrowdown,
  IGetActionOfController,
  PermissionFormValues,
  appliCationDDlForPermission,
} from '../../src/@types/permission';
import agent from '../../src/api/agent';

export default class PermissionStore {
  openDialog = false;

  PermisionRegistry = new Map<number, IPermision>();

  editMode = false; //When click on edit button

  Selectedpermission: IPermision | undefined = undefined;

  totalRecord: number = 0;

  ControllerNameOption: SelectControl3[] = []; // for Controller Name dropdown

  ControllerActionAndMethoOption: SelectControl[] = []; // for Controller Name dropdown

  SubControllerNameOption: SelectControl4[] = []; // for Controller Name dropdown

  ApplicationNameOption: SelectControl[] = []; // for Action Name dropdown

  MethodNameOption: SelectControl[] = []; // for Method Name dropdown

  methodeAndActionListRegestry = new Map<number, IGetActionOfController>();

  selectedActionAndMethod: IGetActionOfController | undefined = undefined;

  saveList: PermissionFormValues[] | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get permissionList() {
    return Array.from(this.PermisionRegistry.values());
  }

  setPermissiontList = (PermnDoc: IPermision) => {
    this.PermisionRegistry.set(PermnDoc.id!, PermnDoc);
  };

  loadPermission = async (params: IPermissionParams) => {
    const result = await agent.Permissions.getList(params);
    console.log(result);
    try {
      const result = await agent.Permissions.getList(params);
      runInAction(() => {
        if (result.data) {
          this.totalRecord = result.data.total;
          result.data.data.forEach((lst: any) => {
            this.setPermissiontList(lst);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Search
  PermissionSearch = async (params: IPermissionParams) => {
    this.PermisionRegistry.clear();
    this.loadPermission(params);
  };

  getPermissionFromRegistry = (id: number) => {
    let PermissionDoc = this.PermisionRegistry.get(id);
    console.log(PermissionDoc);
    if (PermissionDoc) {
      this.editMode = true;
      this.Selectedpermission = PermissionDoc;
    }
  };

  clearPermission = () => {
    this.editMode = false;
    this.Selectedpermission = undefined;
  };

  deletePermission = async (permissionId: number, remark?: string) => {
    try {
      await agent.Permissions.delete(permissionId, remark!);
      runInAction(() => {
        this.PermisionRegistry.delete(permissionId);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createPermission = async (data: PermissionFormValues) => {
    try {
      await agent.Permissions.create(data);
    } catch (error) {
      console.log(error);
    }
  };

  updatePermission = async (internDoc: IPermision) => {
    try {
      await agent.Permissions.update(internDoc);
      runInAction(() => {
        // this.loadPermission({ pageIndex: 0, pageSize: 5 });
        this.PermisionRegistry.delete(internDoc.id!);
        this.PermisionRegistry.set(internDoc.id!, internDoc);
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadControllerNameDropdown = async (name:string) => {
    try {
      const result = await agent.ControllerNames.getContollerList(name);

      this.setControllerName(result);
    } catch (error) {
      console.log(error);
    }
  };

  setControllerName = (data: IControllerNameDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
      };
      return optRow;
    });
    this.ControllerNameOption = op;
  };

  get methodandActionList() {
    return Array.from(this.methodeAndActionListRegestry.values());
  }

  // ################################# Second Dropdown
  loadSubControllerActionsDropdown = async (name: string) => {
    try {
      const result = await agent.ControllerNames.getActionOfController(name);

      this.setActionAndMethod(result);
    } catch (error) {
      console.log(error);
    }
  };

  setActionAndMethod = (data: IGetActionOfController[]) => {
    this.methodeAndActionListRegestry.clear();
    const op = data.map((op, index) => {
      const tmp = {
        tempId: index,
        controller: op.controller,
        isGlobal: true,
        action: op.action,
        method: op.method,
      };
      const optRow = {
        text: op.controller + ('(' + op.action + ')'),
        value: index,
      };
      this.methodeAndActionListRegestry.set(tmp.tempId, tmp);
      console.log(this.methodeAndActionListRegestry);

      return optRow;
    });
    this.ControllerActionAndMethoOption = op;
  };

  getAtionAndMethodFromRegistry= async  (id: number) => {
    console.log(id);
    let data = await this.methodeAndActionListRegestry.get(id);
    runInAction(()=>{
      if (data) {
       
        this.selectedActionAndMethod = data;
      }
    })
   
  };

  loadApplicationDropdown = async () => {
    //console.log(agent.Permissions.getList({pageIndex:0,pageSize:10}));
    try {
      const result = await agent.ControllerNames.getApplicationListForPermis();

      this.setApplicationDropdown(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  setApplicationDropdown = (data: appliCationDDlForPermission[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.displayName,
        value: op.name,
      };
      return optRow;
    });
    this.ApplicationNameOption = op;
  };

  addtoList = (data: PermissionFormValues) => {
    this.saveList?.push(data);
  };

  /// Load Cascading Dropdown
  // loadCascadingDropDown = async (params: ICascadingDrowdown) => {
  //   const result = await agent.ControllerNames.getActionOfController();
  //   console.log(result);
  // };
}
