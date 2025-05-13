import { createReducer, on } from '@ngrx/store';
import { postsActions } from '../actions/posts.actions';
import { PostsState } from '../models/post.model';

export const postFeatureKey = 'posts';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(postsActions.loadPosts, (state) => ({ ...state, loading: true })),
  on(postsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    loading: false,
    posts,
  })),
  on(postsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(postsActions.createPost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(postsActions.createPostSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    posts: [post, ...state.posts],
  })),
  on(postsActions.createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
