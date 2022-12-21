import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
   isLogin = new BehaviorSubject<any>('');

   getUserDetails() {
    if(localStorage.getItem('userData')){
      this.isLogin.next(true)
      return localStorage.getItem('userData');
    }else{
      this.isLogin.next(false);
      return null
    }
  }

  setDataInLocalStorage(variableName: any, data: any) {
      localStorage.setItem(variableName, data);
  }
  getToken() {
      return localStorage.getItem('token');
  }
  clearStorage() {
      localStorage.clear();
  }
}