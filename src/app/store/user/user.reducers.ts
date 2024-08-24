import { createReducer, on } from '@ngrx/store';

import { storeProfile } from './user.actions';
import { User } from '../../models/models';

export interface ProfileState {
  profile: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ProfileState = {
  profile: null,
  error: null,
  status: 'pending',
};

export const profileReducer = createReducer(
  initialState,
  on(storeProfile, (state, { profile }) => ({
    ...state,
    profile: profile,
  }))
);
