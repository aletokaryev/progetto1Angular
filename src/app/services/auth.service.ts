import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';

  constructor() { }


  setToken(token: string){
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.clear();
    window.location.href = 'auth';
  }
}
