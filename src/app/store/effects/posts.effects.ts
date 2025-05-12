import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { postsActions } from '../actions/posts.actions';
import { PostsService } from '../../services/posts.service';

export const PostsEffects = {
  loadPosts: createEffect(
    (actions$ = inject(Actions), postsService = inject(PostsService)) => {
      return actions$.pipe(
        ofType(postsActions.loadPosts),
        mergeMap(() =>
          postsService.fetchPosts().pipe(
            map((posts) => postsActions.loadPostsSuccess({ posts })),
            catchError((error) => of(postsActions.loadPostsFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),

  createPost: createEffect(
    (actions$ = inject(Actions), postsService = inject(PostsService)) => {
      return actions$.pipe(
        ofType(postsActions.createPost),
        mergeMap(({ post }) =>
          postsService.createPost(post).pipe(
            map((newPost) => postsActions.createPostSuccess({ post: newPost })),
            catchError((error) => of(postsActions.createPostFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  )
};
