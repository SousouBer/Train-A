import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CityData } from '../models/models';
import { Station } from '../models/station.interface';
import { Observable } from 'rxjs';

export interface Form {
  from: CityData;
  to: CityData;
  date: string;
}
@Injectable({
  providedIn: 'root',
})
export class TrainTripService {
  private http = inject(HttpClient);

  tripDetails(
    fromCity: CityData,
    toCity: CityData,
    date: string | number = ''
  ): Observable<Station[]> {
    const params = new HttpParams()
      .set('fromLatitude', fromCity?.latitude)
      .set('fromLongitude', fromCity?.longitude)
      .set('toLatitude', toCity?.latitude)
      .set('toLongitude', toCity?.longitude);

    if (date) {
      const unixDate = Math.floor(+date / 1000);

      params.set('date', unixDate);
    }

    return this.http.get<Station[]>('/api/search', { params });
  }
}
