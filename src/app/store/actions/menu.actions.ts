import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const menusActions = createActionGroup({
  source: 'Menus',
  events: {
    'Load Menus': emptyProps(),
    'Load Menus Success': props<{ menus: any[] }>(),
    'Load Menus Failure': props<{ error: any }>(),

    'Create Menu': props<{ menu: any }>(),
    'Create Menu Success': props<{ menu: any }>(),
    'Create Menu Failure': props<{ error: any }>(),

    'Update Menu': props<{ id: number; menu: any }>(),
    'Update Menu Success': props<{ menu: any }>(),
    'Update Menu Failure': props<{ error: any }>(),

    'Delete Menu': props<{ menuId: number }>(),
    'Delete Menu Success': props<{ menuId: number }>(),
    'Delete Menu Failure': props<{ error: any }>(),

    'Assign Menu': props<{
      payload: { menu_id: number; userIds: number[] };
      callback: (status: string, message: string) => void;
    }>(),
  },
});
