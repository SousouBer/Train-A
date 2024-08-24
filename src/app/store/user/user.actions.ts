import { createAction, props } from '@ngrx/store';
import { User } from '../../models/models';

export const loadProfile = createAction('[Profile Page] Load User Profile');

export const storeProfile = createAction(
  '[Profile Page] Store User Profile',
  props<{ profile: User }>()
);
