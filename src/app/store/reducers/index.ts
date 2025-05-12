import { ActionReducerMap } from '@ngrx/store';
import { postsReducer } from './posts.reducer';
import { PostsState } from '../models/post.model';

export interface AppState {
  posts: PostsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  posts: postsReducer,
};
