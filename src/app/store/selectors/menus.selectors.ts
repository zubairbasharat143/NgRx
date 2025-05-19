import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectMenusState = createFeatureSelector<any>('menus');

export const selectAllMenus = createSelector(
  selectMenusState,
  (state) => state.menus
);
