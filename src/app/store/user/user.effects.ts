import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loadProfile, storeProfile } from './user.actions';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';

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
          catchError(() => EMPTY)
        )
      )
    )
  );
}
