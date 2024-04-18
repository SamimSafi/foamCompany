import { makeAutoObservable, runInAction } from 'mobx';
import {
  GetUserDataforLocalStorage,
  LoginFormValue,
  ResetPassword,
  SendVerificationCode,
  User,
  VerificationCodeResponse,
  VerifyVerificationCode,
} from 'src/@types/login';
import agent from '../../api/agent';
import { store } from '../store';
import { language } from 'src/utils/general';
import { HubConnection } from '@microsoft/signalr';

export default class LoginStore {
  user: User | null = null;

  openDialog = false;

  editMode = false; //When click on edit button

  totalRecord: number = 0;

  refreshTokenTimeout: any;

  hubConnection: null | HubConnection | undefined;

  userData: GetUserDataforLocalStorage | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLogedIn() {
    //this save that is user login or no
    return !!this.user;
  }

  login = async (data: LoginFormValue) => {
    try {
      agent.changeLanguage.ChangeLanguage(language()!);
      const getuser = await agent.Logins.login(data);
      console.log(getuser.DepartmentId);

      store.CommonStore.setToken(getuser.Token);
      this.startRefreshTokenTimer(getuser.TokenExpiration!);
      runInAction(() => {
        this.user = getuser;
        const empID = getuser.EmployeeProfileId;
        window.localStorage.setItem('empID', empID!.toString());
        this.userData = {
          IsSuperAdmin: getuser.IsSuperAdmin,
          AttendanceId: getuser.AttendanceId!,
          EmployeeProfileId: getuser.EmployeeProfileId,

          userrole: getuser.Userrole,

          userpermission: getuser.Userpermission,
          applicationuser: getuser.Applicationuser,
        };
      });

      if (this.userData) {
        localStorage.setItem('userData', JSON.stringify(this.userData));
      }
    } catch (error) {
      throw error;
    }
  };

  SendVerificationCode = async (data: SendVerificationCode) => {
    const sendCode = await agent.Logins.SendCode(data);
    runInAction(() => {
      window.localStorage.setItem('email-recovery', data.email);
    });
  };

  VerifyVerificationCode = async (data: VerifyVerificationCode) => {
    const sendCode = await agent.Logins.VerifyCode(data);
    runInAction(() => {
      window.localStorage.setItem('email-recovery', data.email!);
      window.localStorage.setItem('user-id', sendCode.data);
    });
  };

  ResetPassword = async (data: ResetPassword) => {
    const sendCode = await agent.Logins.ResetPassword(data);
  };

  logout = () => {
    store.CommonStore.setToken(null);
    window.localStorage.removeItem('mewToken');
    this.user = null;
    this.hubConnection?.stop();
  };

  getCurrentUSer = async () => {
    try {
      agent.changeLanguage.ChangeLanguage(language()!);
      const getuser = await agent.Logins.current();
      store.CommonStore.setToken(getuser.RefreshToken!);
      runInAction(() => (this.user = getuser));
      this.startRefreshTokenTimer(getuser.TokenExpiration!);
    } catch (error) {
      console.log(error);
    }
  };

  setHubConnection = async (connection: null | HubConnection | undefined) => {
    this.hubConnection = connection;
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Logins.refreshToken();
      runInAction(() => (this.user = user));
      store.CommonStore.setToken(user.RefreshToken!);
      this.startRefreshTokenTimer(user.TokenExpiration!);
    } catch (error) {
      console.log(error);
      this.user = null;
    }
  };

  private startRefreshTokenTimer(userToken: Date) {
    // const jwtToken = JSON.parse(atob(userToken.split('.')[1]));
    const expire = new Date(userToken);

    console.log(expire.getTime() - Date.now() - 30 * 1000);

    const timeout = expire.getTime() - Date.now() - 30 * 1000; //Token Will Refresh 30sec Before Expire
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  // //Pagination
  // loadOutLogins = async (param: LoginFormValue) => {
  //   const result = await AgentLogin.Logins.getList(param);
  //   console.log(result);
  //   try {
  //     const result = await AgentLogin.Logins.getList(param);
  //     // runInAction(() => {
  //     //   this.totalRecord = result.data.totalRecord;
  //     //   result.data.data.forEach((lst: any) => {
  //     //     this.setLoginList(lst);
  //     //   });
  //     // });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Search
  // LoginSearch = async (params: LoginParams) => {
  //   this.LoginRegistry.clear();
  //   this.loadOutLogins(params);
  // };

  // getLoginFromRegistry = (id: number) => {
  //   let Login = this.LoginRegistry.get(id);
  //   if (Login) {
  //     this.editMode = true;
  //     this.selectedLogin = Login;
  //   }
  // };

  //   deleteOutSideOrganization = async (id: number, remark?: string) => {
  //     try {
  //       await agentOutSideOrg.OutSideOrganizations.delete(id, remark!);
  //       runInAction(() => {
  //         this.OutSideOrganizationRegistry.delete(id);
  //         this.totalRecord--;
  //         this.setOpenCloseDialog();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  // createLogin = async (loginSide: Login) => {
  //   const data = await AgentLogin.Logins.create(loginSide);
  //   console.log(data);
  //   try {
  //     await AgentLogin.Logins.create(loginSide);
  //     runInAction(() => {
  //       this.loadOutLogins({ pageIndex: 0, pageSize: 5 });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   updateOutSideOrganization = async (outSide: OutSideOrganization) => {
  //     try {
  //       await agentOutSideOrg.OutSideOrganizations.update(outSide);
  //       runInAction(() => {
  //         this.loadOutLogins({ pageIndex: 0, pageSize: 5 });
  //         this.OutSideOrganizationRegistry.delete(outSide.id!);
  //         this.OutSideOrganizationRegistry.set(outSide.id!, outSide);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
}
