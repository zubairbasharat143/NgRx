import { ActionReducerMap } from '@ngrx/store';
import { postsReducer } from './posts.reducer';
import { PostsState, UserState } from '../models/post.model';
import { userReducer } from './user.reducer';

export interface AppState {
  users: UserState;
  posts: PostsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: userReducer,
  posts: postsReducer,
};
