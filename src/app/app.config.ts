import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authInterceptor } from './app.interceptor';
import { provideEffects } from '@ngrx/effects';
import { profileReducer } from './store/user/user.reducers';
import { ProfileEffects } from './store/user/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { tripsReducer } from './store/trip/trips.reducers';
import { TripsEffects } from './store/trip/trips.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      profile: profileReducer,
      trips: tripsReducer,
    }),
    provideEffects(ProfileEffects, TripsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
