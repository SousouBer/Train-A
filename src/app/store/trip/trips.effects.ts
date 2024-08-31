import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { TrainTripService } from '../../services/train-trip.service';
import { TripsActions } from './trips.acions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TripsEffects {
  private tripsService = inject(TrainTripService);
  private actions$ = inject(Actions);

  public getTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.getTrips),
      mergeMap((action) =>
        this.tripsService
          .tripDetails(action.fromCity, action.toCity, action.date)
          .pipe(map((trips) => TripsActions.getTripsSuccess({ trips })))
      ),
      catchError((error) => of(TripsActions.getTripsFailure({ error })))
    )
  );
}
