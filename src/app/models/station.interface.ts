import { Geolocation } from './geolocation.interface';

export interface Station {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}
