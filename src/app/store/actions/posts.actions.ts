import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Post } from '../models/post.model';

export const postsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: any }>(),
    'Create Post': props<{ post: Post }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: any }>(),
  },
});
