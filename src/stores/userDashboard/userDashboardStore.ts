import { makeAutoObservable, runInAction } from 'mobx';
import agent from 'src/api/agent';
import { userSummaryByDepartment } from 'src/@types/userDashboard';

export default class userDashboardStore {
  dashboardBydepartmentUserSummary: userSummaryByDepartment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Load User's Dashboard By Department
  getUserSummaryByDepartment = async () => {
    try {
    
    } catch (error) {
      console.log(error);
    }
  };
}
