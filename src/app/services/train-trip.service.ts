import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CityData } from '../models/models';
import { CityCoordinates } from '../models/models';

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

  tripDetails(fromCity: CityData, toCity: CityData, date: string = '') {
    const formValues: CityCoordinates = {
      fromLatitude: fromCity?.geometry.lat,
      fromLongitude: fromCity?.geometry.lng,
      toLatitude: toCity?.geometry.lat,
      toLongitude: toCity?.geometry.lng,
    };

    const params = new HttpParams()
      .set('Attributes', formValues.fromLatitude)
      .set('fromLongitude', formValues.fromLongitude)
      .set('toLatitude', formValues.toLatitude)
      .set('toLongitude', formValues.toLongitude);

    if (formValues.date) {
      params.set('date', formValues.date);
    }

    return this.http.get('/api/search', { params });
  }
}
