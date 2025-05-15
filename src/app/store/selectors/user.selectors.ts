import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/post.model';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUserById = (id: number) =>
  createSelector(selectAllUsers, (users) =>
    users.find((user) => user.usr_id_pk === id)
  );
