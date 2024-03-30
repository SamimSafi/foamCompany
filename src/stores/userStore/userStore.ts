import { makeAutoObservable, observable, runInAction } from 'mobx';
import { SelectControl } from 'src/@types/common';
import agent from 'src/api/agent';
import { IApplicationDropdown, IPermissionDropdown } from 'src/@types/permission';
import {
  chPassword,
  CreateUser,
  deleteUser,
  ResetPassword,
  responseCode,
  userDetail,
  UserLog,
  userLogParams,
  userParams,
} from 'src/@types/createUser';
import { UserReport, UserReportResult } from 'src/@types/userReport';

export default class UserStore {
  openDialog = false;

  UserRegistry = new Map<string, CreateUser>();

  UserLogRegistry = new Map<number, UserLog>();

  editMode = false; //When click on edit button

  userResponse: responseCode | undefined;

  selectedUser: CreateUser | undefined = undefined;

  userReportResult: UserReportResult[] = [];

  SelecteduserDetail: userDetail | undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get userList() {
    return Array.from(this.UserRegistry.values());
  }

  setUserList = (users: CreateUser) => {
    this.UserRegistry.set(users.id!, users);
  };

  get userLogList() {
    return Array.from(this.UserLogRegistry.values());
  }

  setUserLogList = (users: UserLog) => {
    this.UserLogRegistry.set(users.id, users);
  };

  loadUserReport = async (reportParams: UserReport) => {
    try {
      const axiosResponse = await agent.createUser.getUserReport(reportParams);

      runInAction(() => {
        this.userReportResult = axiosResponse.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadUser = async (params: userParams) => {
    try {
      const result = await agent.createUser.getUsers(params);
      runInAction(() => {
        if (result) {
          this.totalRecord = result.data.total;
          result.data.data.forEach((lst: any) => {
            this.setUserList(lst);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadUserLog = async (params: userLogParams) => {
    try {
      const result = await agent.createUser.getUsersLog(params);
      runInAction(() => {
        if (result) {
          this.totalRecord = result.data.totalRecord;
          result.data.data.forEach((lst: any) => {
            this.setUserLogList(lst);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadUserDetail = async (id: string) => {
    try {
      const axiosResponse = await agent.createUser.userDetail(id);
      console.log(axiosResponse.userRoles);
      runInAction(() => {
        this.SelecteduserDetail = axiosResponse;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadProfile = async () => {
    try {
      const getProfile = await agent.createUser.userProfile();
      runInAction(() => {
        this.SelecteduserDetail = getProfile.data;
      });
    } catch (error) {}
  };

  // Search
  UserSearch = async (params: userParams) => {
    this.UserRegistry.clear();

    this.loadUser(params);
  };

  // Search
  UserLogSearch = async (params: userLogParams) => {
    this.UserLogRegistry.clear();

    this.loadUserLog(params);
  };

  getUserFromRegistry = (id: string) => {
    let Users = this.UserRegistry.get(id);
    if (Users) {
      this.editMode = true;
      this.selectedUser = Users;
    }
  };

  clearSelectedUser = () => {
    this.editMode = false;
    this.selectedUser = undefined;
    this.clearUserInfo();
  };

  clearSelectedUserDetail = () => {
    this.editMode = false;
    this.SelecteduserDetail = undefined;
    this.clearUserInfo();
  };

  clearUserInfo = () => {
    this.userResponse = undefined;
  };

  deleteUser = async (data: deleteUser) => {
    try {
      await agent.createUser.delete(data.Id!, data.remarks);
      runInAction(() => {
        this.UserRegistry.delete(data.Id!);
        this.totalRecord--;
        this.setOpenCloseDialog();
      });
    } catch (error) {
      console.log(error);
    }
  };

  UserActivations = async (id: string, isActive: boolean) => {
    try {
      if (isActive === true) {
        await agent.createUser.userActivate(id, false);
      } else {
        await agent.createUser.userActivate(id, true);
      }
      runInAction(() => {
        this.loadUser({ pageIndex: 0, pageSize: 5 });
      });
    } catch (error) {
      console.log(error);
    }
  };

  resetPassword = async (data: ResetPassword) => {
    try {
      await agent.createUser.resetPassword(data.id!, data.newPassword!);
      runInAction(() => {
        this.loadUser({ pageIndex: 0, pageSize: 5 });
        this.clearSelectedUser();
      });
    } catch (error) {
      console.log(error);
    }
  };

  changePassword = async (data: chPassword) => {
    await agent.createUser
      .changePassword(data.Id!, data.currentPassword, data.newPassword)
      .then(() => {
        runInAction(() => {
          this.loadUser({ pageIndex: 0, pageSize: 5 });
          this.setOpenCloseDialog();
        });
      });
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createUser = async (data: CreateUser) => {
    await agent.createUser.create1(data).then((res) => {
      runInAction(() => {
        this.userResponse = res.data;
      });
    });
    runInAction(() => {
      this.loadUser({ pageIndex: 0, pageSize: 5 });
    });
  };

  updateUser = async (data: CreateUser) => {
    await agent.createUser.update(data);
    runInAction(() => {
      this.loadUser({ pageIndex: 0, pageSize: 5 });
      this.UserRegistry.delete(data.id!);
      this.UserRegistry.set(data.id!, data);
    });
  };
}
