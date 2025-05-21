import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectMenusState = createFeatureSelector<any>('menus');

export const selectAllMenus = createSelector(
  selectMenusState,
  (state) => state.menus
);

export const selectMenuById = (id: number) =>
  createSelector(selectAllMenus, (menus) =>
    menus.find((menu: any) => menu.menu_id === id)
  );
