import { createReducer, on } from '@ngrx/store';

import { loadProfile, storeProfile } from './user.actions';
import { User } from '../../models/models';
import { Status } from '../app.state';

export interface ProfileState {
  profile: User | null;
  error: string | null;
  status: Status;
}

export const initialState: ProfileState = {
  profile: null,
  error: null,
  status: Status.Pending,
};

export const profileReducer = createReducer(
  initialState,
  on(loadProfile, (state) => ({ ...state, status: Status.Loading })),
  on(storeProfile, (state, { profile }) => ({
    ...state,
    profile: profile,
    status: Status.Success,
  }))
);
