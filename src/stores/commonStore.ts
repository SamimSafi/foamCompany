import { makeAutoObservable, reaction } from 'mobx';

export default class CommonStore {
  token: string | null = window.localStorage.getItem('mewToken');

  apploaded = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('mewToken', token);
        } else {
          window.localStorage.removeItem('mewToken');
        }
      }
    );
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  setApploaded = () => {
    this.apploaded = true;
  };
}
