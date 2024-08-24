import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { SignupData } from '../models/models';
import { SigninData } from '../models/models';
import { User } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signup(credentials: SignupData): Observable<User> {
    return this.http.post<User>('/api/signup', credentials);
  }

  signin(credentials: SigninData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/signin', credentials);
  }

  profile(): Observable<User> {
    return this.http.get<User>('/api/profile');
  }

  updateProfile(data: { name?: string; email?: string }): Observable<User> {
    return this.http.put<User>('/api/profile', data);
  }
}
