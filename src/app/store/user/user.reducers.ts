import { createReducer, on } from '@ngrx/store';

import { storeProfile } from './user.actions';

export default interface User {
  name: string;
  email: string;
  role: 'manager' | 'user';
}

let initialState: User = {
  name: '',
  email: '',
  role: 'user',
};

export const profileReducer = createReducer(
  initialState,
  on(storeProfile, (state, action) => action.profile)
);
