import { makeAutoObservable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import { IRole, permissionDropdown, roleDetail, roleParams } from '../../@types/role';
import agentRole from '../../api/agent';

export default class RoleStore {
  openDialog = false;

  RoleRegistry = new Map<number, IRole>();

  editMode = false; //When click on edit button

  selectedRole: IRole | undefined = undefined;

  selectedRoleDetail: roleDetail | undefined;

  totalRecord: number = 0;

  Permissions: SelectControl[] = []; // for Permissions dropdown

  constructor() {
    makeAutoObservable(this);
  }

  get roleList() {
    return Array.from(this.RoleRegistry.values());
  }

  setRoleList = (Rolet: IRole) => {
    this.RoleRegistry.set(Rolet.id!, Rolet);
  };

  loadRole = async (params: roleParams) => {
    try {
      const result = await agentRole.RolesAgent.getList(params);
      runInAction(() => {
        if (result.data) {
          this.totalRecord = result.data.total;
          result.data.data.forEach((lst: any) => {
            this.setRoleList(lst);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadRoleDetail = async (id: number) => {
    try {
      const getRoleDetail = await agentRole.RolesAgent.getDetail(id);
      runInAction(() => {
        this.selectedRoleDetail = getRoleDetail;
      });
    } catch (error) {}
  };

  // Search
  RoleSearch = async (params: roleParams) => {
    this.RoleRegistry.clear();
    this.loadRole(params);
  };

  getRoleFromRegistry = (id: number) => {
    let Roles = this.RoleRegistry.get(id);
    if (Roles) {
      this.editMode = true;
      this.selectedRole = Roles;
    }
  };

  clearSelectedRole = () => {
    this.editMode = false;
    this.selectedRole = undefined;
    this.selectedRoleDetail = undefined;
  };

  deleteRole = async (id: number, remark?: string) => {
    try {
      await agentRole.RolesAgent.delete(id, remark!);
      runInAction(() => {
        this.RoleRegistry.delete(id);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createRole = async (roles: IRole) => {
    try {
      await agentRole.RolesAgent.create(roles);
      runInAction(() => {
        this.loadRole({ pageIndex: 0, pageSize: 5 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateRole = async (roles: IRole) => {
    try {
      await agentRole.RolesAgent.update(roles);
      runInAction(() => {
        this.loadRole({ pageIndex: 0, pageSize: 5 });
        this.RoleRegistry.delete(roles.id!);
        this.RoleRegistry.set(roles.id!, roles);
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadPermissionDropdown = async () => {
    try {
      const result = await agentRole.Permissions.List({
        pageIndex: 0,
        pageSize: 300,
      });
      this.setPermissionDropdown(result.data.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  setPermissionDropdown = (data: permissionDropdown[]) => {
    const op = data.map((op) => {
      const optRow = {
        text: op.name,
        value: op.id,
      };
      return optRow;
    });
    this.Permissions = op;
  };
}
