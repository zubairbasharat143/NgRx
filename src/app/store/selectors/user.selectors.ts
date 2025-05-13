import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/post.model'; // adjust if needed

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);
