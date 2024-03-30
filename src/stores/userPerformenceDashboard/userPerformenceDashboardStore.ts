import { makeAutoObservable, runInAction } from 'mobx';
import agent from 'src/api/agent';
import {
  ExternalDocumentDashboardByLoggedInUser,
  InternalDocumentDashboardByLoggedInUser,
  ArchiveDataEntryByLoggedUserAndDocument,
} from 'src/@types/userPerformenceDashboard';

export default class userPerformenceDashboardStore {
  externalDocumentDashboardByLoggedInUser: ExternalDocumentDashboardByLoggedInUser[] = [];

  internalDocumentDashboardByLoggedInUser: InternalDocumentDashboardByLoggedInUser[] = [];

  ArchiveDataEntryByLoggedInUserDashboard: ArchiveDataEntryByLoggedUserAndDocument[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Load Current Logged in User's Dashboard
  getLoggedInUsersDashboard = async () => {
    try {
    
    } catch (error) {
      console.log(error);
    }
  };
}
