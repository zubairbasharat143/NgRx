import { createActionGroup, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ posts: Post[] }>(),
    'Login Failure': props<{ error: any }>(),
  },
});
