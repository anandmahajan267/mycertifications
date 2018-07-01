import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";


@Injectable()
export class AuthService {
  @LocalStorage('token') public token:string;
  //token: string ='';


  getAuthToken() {
    return this.token;
  }
  setAuthToken(tkn) {
    this.token = tkn;
  }

  suSetAuthToken() {
    this.token = '';
  }

  isAuthenticated() {
    if (this.token != '') {
      return true;
    }
    else {
      return false;
    }
  }
}
