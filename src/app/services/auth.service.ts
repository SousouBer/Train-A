import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import SignupData from '../models/models';
import SigninData from '../models/models';
import User from '../models/models';
import { Observable } from 'rxjs';

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

  profile(): Observable<User> {
    return this.http.get<User>('/api/profile');
  }
}
