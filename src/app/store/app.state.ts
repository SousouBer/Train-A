import { ProfileState } from './user/user.reducers';

export enum Status {
  Pending = 'pending',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export interface AppState {
  profile: ProfileState;
}
