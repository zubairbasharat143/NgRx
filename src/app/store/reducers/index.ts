import { ActionReducerMap } from '@ngrx/store';
import { postFeatureKey, postsReducer } from './posts.reducer';
import { PostsState, UserState } from '../models/post.model';
import { userFeatureKey, userReducer } from './user.reducer';
import { menusFeatureKey, menusReducer } from './menus.reducer';

export interface AppState {
  users: UserState;
  posts: PostsState;
  menus: any;
}

export const appReducers: ActionReducerMap<AppState> = {
  [userFeatureKey]: userReducer,
  [postFeatureKey]: postsReducer,
  [menusFeatureKey]: menusReducer,
};
