import { createAction, props } from '@ngrx/store';
import { TripsConstants } from '../constants/trips.enum';
import { Station } from '../../models/station.interface';

export const TripsActions = {
  getTrips: createAction(TripsConstants.GET_TRIPS),
  getTripsSuccess: createAction(
    TripsConstants.GET_TRIPS_SUCCESS,
    props<{ trips: Station[] }>()
  ),
  getTripsFailure: createAction(
    TripsConstants.GET_TRIPS_FAILURE,
    props<{ error: string }>()
  ),
};
