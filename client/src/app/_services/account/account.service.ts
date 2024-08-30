import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserAuthResponse, UserLoginData, UserRegisterData } from '../../_interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';
  currentUser = signal<UserAuthResponse | null>(null);

  login(userLoginData: UserLoginData) {
    return this.http
      .post<UserAuthResponse>(this.baseUrl + 'account/login', userLoginData)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(userRegisterData: UserRegisterData) {
    return this.http
      .post<UserAuthResponse>(
        this.baseUrl + 'account/register',
        userRegisterData
      )
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
        })
      );
  }
}
