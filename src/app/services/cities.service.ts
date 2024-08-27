import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  searchCity(searchValue: string) {
    const params = {
      key: this.apiKey,
      q: searchValue,
      type: 'city',
      limit: '5',
    };

    return this.http.get(this.apiUrl, { params }).pipe(
      map((res: any) => {
        const resData = res.results;

        const cities = resData.filter(
          (result: any) => result.components._type === 'city'
        );

        for (let city of cities) {
          console.log(city.formatted);
        }
      })
    );
  }
}
