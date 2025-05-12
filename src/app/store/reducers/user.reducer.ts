import { userActions } from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
import { UserState } from '../models/post.model';

export const initialState: UserState = {
  posts: [],
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,

  on(userActions.login, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(userActions.loginSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
  })),

  on(userActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
