import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from '../actions/user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

export const UserEffects = {
  login: createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      router = inject(Router)
    ) => {
      return actions$.pipe(
        ofType(userActions.login),
        mergeMap(({ email, password }) =>
          authService.login(email, password).pipe(
            tap((response) => {
              console.log(response, '----');
              sessionStorage.setItem('token', response.data.token);
              router.navigate(['']);
            })
          )
        )
      );
    },
    { functional: true, dispatch: false }
  ),

  createUser: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(userActions.createUser),
        mergeMap(({ user }) => {
          const token: any = sessionStorage.getItem('token');
          return authService.createUser(user, token).pipe(
            tap((response) => {
              console.log('User Created:', response);
              // Optionally, show a toast or trigger navigation
            }),
            catchError((error) => {
              console.error('User creation failed:', error);
              return of(userActions.createUserFailure({ error }));
            })
          );
        })
      );
    },
    { functional: true, dispatch: false }
  ),

  getAllUsers: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(userActions.getAllUsers),
        mergeMap(() =>
          authService.getAllUsers().pipe(
            map((response) => {
              console.log(response, 'users---');

              // Safely extract the array from response.data and cast it
              const usersArr = response.data as User[];

              return userActions.getAllUsersSuccess({ users: usersArr });
            }),
            catchError((error) => of(userActions.getAllUsersFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),
};
