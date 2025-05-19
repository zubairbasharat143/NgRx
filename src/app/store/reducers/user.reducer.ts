import { userActions } from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { UserState } from '../models/post.model';

export const userFeatureKey = 'users';

export const initialState: UserState = {
  posts: [],
  users: [],
  error: null,
  loading: false,
  token: '',
};

export const userReducer = createReducer(
  initialState,

  // Login reducers
  on(userActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
  on(userActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Create user failure (optional success)
  on(userActions.createUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(userActions.getAllUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),

  on(userActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) =>
      u.usr_id_pk === user.usr_id_pk ? { ...u, ...user } : u
    ),
  }))
);
