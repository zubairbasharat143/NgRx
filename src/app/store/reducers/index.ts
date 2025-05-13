import { ActionReducerMap } from '@ngrx/store';
import { postFeatureKey, postsReducer } from './posts.reducer';
import { PostsState, UserState } from '../models/post.model';
import { userFeatureKey, userReducer } from './user.reducer';

export interface AppState {
  users: UserState;
  posts: PostsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [userFeatureKey]: userReducer,
  [postFeatureKey]: postsReducer,
};
