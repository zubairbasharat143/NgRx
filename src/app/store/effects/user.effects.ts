import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from '../actions/user.actions';
import { mergeMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export const UserEffects = {
  login: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService),
      router = inject(Router)) => {
      return actions$.pipe(
        ofType(userActions.login),
        mergeMap(({ email, password }) =>
          authService.login(email, password).pipe(
            tap((response) => {
              console.log(response,"----")
              sessionStorage.setItem('token', response.data.token);
              router.navigate(['']);
            })
          )
        )
      );
    },
    { functional: true, dispatch: false }
  ),
};
