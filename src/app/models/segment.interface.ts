import { CarriagePrice } from './carriage-price.interface';

export interface Segment {
  time: string[];
  price: CarriagePrice;
  occupiedSeats: number[];
}
