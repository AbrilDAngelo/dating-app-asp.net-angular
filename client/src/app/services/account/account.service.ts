import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLoginData } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';

  login(userLoginData: UserLoginData) {
    return this.http.post(this.baseUrl + 'account/login', userLoginData);
  }
}
