import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token || environment.tokenKey); // Utilizza il valore del token dall'environment se non viene fornito un token esplicito
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '/logout';
  }
}
