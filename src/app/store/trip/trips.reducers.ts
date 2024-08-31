import { createReducer, on } from '@ngrx/store';

import { Station } from '../../models/station.interface';
import { Status } from '../app.state';
import { TripsActions } from './trips.acions';

export interface TripsState {
  trips: Station[];
  status: Status;
  error: string | null;
}

export const initialState: TripsState = {
  trips: [],
  status: Status.Pending,
  error: null,
};

export const tripsReducer = createReducer(
  initialState,
  on(TripsActions.getTrips, (state) => ({
    ...state,
    status: Status.Loading,
  })),
  on(TripsActions.getTripsSuccess, (state, action) => ({
    ...state,
    trips: action.trips,
    status: Status.Success,
  })),
  on(TripsActions.getTripsFailure, (state, { error }) => ({
    ...state,
    status: Status.Error,
    error: error,
  }))
);
