import { async } from '@firebase/util';
import { makeAutoObservable, runInAction } from 'mobx';
import { ILanguage, ILanguageParams } from '../@types/language';
import LanguageAgent from '../api/agent';
import { lang } from 'moment';
import { language } from 'src/utils/general';
export default class LanguageStore {
  openDialog = false;

  //LanguageRegistry = new Map<number, ILanguage>();
  LanguageRegistry: ILanguage[] = [];

  editMode = false; //When click on edit button

  selectedLanugage: ILanguage | undefined = undefined;

  totalRecord: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get LanguageList() {
    return Array.from(this.LanguageRegistry.values());
  }

  setLanguageList = (lang: ILanguage) => {
    this.LanguageRegistry.push(lang);
  };

  //Pagination
  loadLanguage = async (params: ILanguageParams) => {
    try {
      const result = await LanguageAgent.Lanugages.getList(params);
      runInAction(() => {
        this.totalRecord = result.data.totalRecord;
        if (params.pageIndex === 0) {
          this.LanguageRegistry = result.data.data.slice();
        } else {
        result.data.data.forEach((lst: any) => {
          this.setLanguageList(lst);
        });
      }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Search
  LanguageSearch = async (params: ILanguageParams) => {
    //this.LanguageRegistry.clear();
    this.loadLanguage(params);
  };

  getLanguageFromRegistry = (id: number) => {
    let docLanguage = this.LanguageRegistry.find((language) => language.id === id);
    if (docLanguage) {
      this.editMode = true;
      this.selectedLanugage = docLanguage;
    }
  };

  clearSelectedLanguage = () => {
    this.editMode = false;
    this.selectedLanugage = undefined;
  };

  deleteLanguage = async (id: number, remark?: string) => {
    try {
      await LanguageAgent.Lanugages.delete(id, remark!);
      runInAction(() => {
        const index = this.LanguageRegistry.findIndex((language) => language.id === id);
        if (index !== -1) {
          this.LanguageRegistry.splice(index, 1);
          this.totalRecord--;
          this.setOpenCloseDialog();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  setOpenCloseDialog = () => (this.openDialog = !this.openDialog);

  createLanguage = async (docLanguage: ILanguage) => {
    //console.log(docLanguage);
   
      //console.log(docLanguage);
      await LanguageAgent.Lanugages.create(docLanguage);
      runInAction(() => {
        this.loadLanguage({ pageIndex: 0, pageSize: 5 });
      });
    
  };

  updateLanguage = async (docLanguage: ILanguage) => {
      await LanguageAgent.Lanugages.update(docLanguage);

      runInAction(() => {
        const index = this.LanguageRegistry.findIndex((language) => language.id === docLanguage.id);
      if (index !== -1) {
        this.LanguageRegistry.splice(index, 1, language);
        this.loadLanguage({ pageIndex: 0, pageSize: 5 });
      }
      });
  };
}
