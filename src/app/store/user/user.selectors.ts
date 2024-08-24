import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../models/models';
import { AppState } from '../app.state';
import { ProfileState } from './user.reducers';

export const profileState = (state: AppState) => state.profile;

export const selectProfileDetails = createSelector(
  profileState,
  (state: ProfileState) => state.profile
);

export const profileStatus = createSelector(
  profileState,
  (state: ProfileState) => state.status
);
