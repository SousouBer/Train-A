import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  loadProfile,
  loadProfileFailure,
  storeProfile,
  updatePassword,
  updateProfile,
} from './user.actions';
import {
  catchError,
  concatMap,
  EMPTY,
  exhaustMap,
  map,
  of,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      exhaustMap(() =>
        this.authService.profile().pipe(
          map((profile) => storeProfile({ profile: profile })),
          catchError(() => of(loadProfileFailure()))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      exhaustMap((action) =>
        this.authService.updateProfile(action.data).pipe(
          map(() => loadProfile()),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updatePassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePassword),
        concatMap((action) =>
          this.authService
            .changePassword(action.password)
            .pipe(catchError(() => EMPTY))
        )
      ),
    { dispatch: false }
  );
}
