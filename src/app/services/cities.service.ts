import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

import { CityData } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getCities() {
    return this.http.get<CityData[]>(this.apiUrl);
  }
}
