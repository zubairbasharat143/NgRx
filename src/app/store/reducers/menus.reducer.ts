import { createReducer, on } from '@ngrx/store';
import { menusActions } from '../actions/menu.actions';

export const menusFeatureKey = 'menus';

const initialState = {
  menus: <any>[],
  loading: false,
  error: null,
};

export const menusReducer = createReducer(
  initialState,

  // getMenus
  on(menusActions.loadMenus, (state) => ({
    ...state,
    loading: true,
  })),
  on(menusActions.loadMenusSuccess, (state, { menus }) => ({
    ...state,
    loading: false,
    menus,
  })),
  on(menusActions.loadMenusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // createMenu
  on(menusActions.createMenu, (state) => ({
    ...state,
    loading: true,
  })),
  on(menusActions.createMenuSuccess, (state, { menu }) => ({
    ...state,
    loading: false,
    menus: [...state.menus, menu],
  })),
  on(menusActions.createMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // updateMenu
  on(menusActions.updateMenu, (state) => ({
    ...state,
    loading: true,
  })),
  on(menusActions.updateMenuSuccess, (state, { menu }) => ({
    ...state,
    loading: false,
    menus: state.menus.map((m: any) =>
      m.menu_id === menu.menu_id ? { ...m, ...menu } : m
    ),
  })),
  on(menusActions.updateMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // deleteMenu
  on(menusActions.deleteMenu, (state) => ({
    ...state,
    loading: true,
  })),
  on(menusActions.deleteMenuSuccess, (state, { menuId }) => ({
    ...state,
    loading: false,
    menus: state.menus.filter((menu: any) => menu.menu_id !== menuId),
  })),
  on(menusActions.deleteMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
