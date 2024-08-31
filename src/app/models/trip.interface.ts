import { Route } from './route.interface';
import { Station } from './station.interface';

export interface Trip {
  from: Station;
  to: Station;
  routes: Route[];
}
