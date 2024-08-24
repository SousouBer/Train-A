import { createSelector, createFeatureSelector } from '@ngrx/store';
import User from '../../models/models';
import { AppState } from '../app.state';

export const state = (state: AppState) => state.profile;

export const selectProfileDetails = createSelector(
  state,
  (state: User) => state
);
