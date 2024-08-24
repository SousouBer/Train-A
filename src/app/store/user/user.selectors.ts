import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../models/models';
import { AppState } from '../app.state';

export const profileState = (state: AppState) => state.profile;

export const selectProfileDetails = createSelector(
  profileState,
  (state: User) => state
);
