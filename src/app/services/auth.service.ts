import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import SignupData from '../models/models';
import SigninData from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signup(credentials: SignupData) {
    return this.http.post('/api/signup', credentials);
  }

  signin(credentials: SigninData) {
    return this.http.post<{ token: string }>('/api/signin', credentials);
  }
}
