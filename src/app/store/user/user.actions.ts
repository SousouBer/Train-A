import { createAction, props } from '@ngrx/store';
import { User } from '../../models/models';

export const loadProfile = createAction('[Profile Page] Load User Profile');

export const storeProfile = createAction(
  '[Profile Page] Store User Profile',
  props<{ profile: User }>()
);

export const loadProfileFailure = createAction(
  '[Profile API] Load Profile Error'
);

export const updateProfile = createAction(
  '[Profile API] Update Profile Name And Email',
  props<{ data: { name?: string; email?: string } }>()
);

export const updatePassword = createAction(
  '[Profile API] Update Password',
  props<{ password: string }>()
);
