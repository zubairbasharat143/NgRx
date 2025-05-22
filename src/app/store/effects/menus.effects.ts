import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MenusService } from '../../services/menus.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { menusActions } from '../actions/menu.actions';

export const MenusEffects = {
  loadMenus: createEffect(
    (actions$ = inject(Actions), menusService = inject(MenusService)) => {
      return actions$.pipe(
        ofType(menusActions.loadMenus),
        mergeMap(() =>
          menusService.getMenus().pipe(
            map((response) =>
              menusActions.loadMenusSuccess({ menus: response.data })
            ),
            catchError((error) => of(menusActions.loadMenusFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),

  createMenu: createEffect(
    (actions$ = inject(Actions), menusService = inject(MenusService)) => {
      return actions$.pipe(
        ofType(menusActions.createMenu),
        mergeMap(({ menu }) =>
          menusService.createMenu(menu).pipe(
            map((response) =>
              menusActions.createMenuSuccess({ menu: response.data })
            ),
            catchError((error) => of(menusActions.createMenuFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),

  updateMenu: createEffect(
    (actions$ = inject(Actions), menusService = inject(MenusService)) => {
      return actions$.pipe(
        ofType(menusActions.updateMenu),
        mergeMap(({ id, menu }) => {
          return menusService.updateMenu(id, menu).pipe(
            map((response) =>
              menusActions.updateMenuSuccess({ menu: response.data })
            ),
            catchError((error) => of(menusActions.updateMenuFailure({ error })))
          );
        })
      );
    },
    { functional: true }
  ),

  deleteMenu: createEffect(
    (actions$ = inject(Actions), menusService = inject(MenusService)) => {
      return actions$.pipe(
        ofType(menusActions.deleteMenu),
        mergeMap(({ menuId }) =>
          menusService.deleteMenu(menuId).pipe(
            map(() => menusActions.deleteMenuSuccess({ menuId })),
            catchError((error) => of(menusActions.deleteMenuFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),

  assignMenu: createEffect(
    (actions$ = inject(Actions), menusService = inject(MenusService)) => {
      return actions$.pipe(
        ofType(menusActions.assignMenu),
        mergeMap(({ payload, callback }) =>
          menusService.assignMenu(payload).pipe(
            tap(() => {
              callback('success', 'Menu Assigned successfully');
            }),
            catchError((error) => {
              callback(
                'error',
                error?.error?.meta?.message || 'Assignment failed'
              );
              return of();
            })
          )
        )
      );
    },
    { functional: true }
  ),
};
