import { createReducer, on } from '@ngrx/store';

import { loadProfile, loadProfileFailure, storeProfile } from './user.actions';
import { User } from '../../models/models';
import { Status } from '../app.state';

export interface ProfileState {
  profile: User | null;
  status: Status;
}

export const initialState: ProfileState = {
  profile: null,
  status: Status.Pending,
};

export const profileReducer = createReducer(
  initialState,
  on(loadProfile, (state) => ({ ...state, status: Status.Loading })),
  on(storeProfile, (state, { profile }) => ({
    ...state,
    profile: profile,
    status: Status.Success,
  })),
  on(loadProfileFailure, (state) => ({ ...state, status: Status.Error }))
);
