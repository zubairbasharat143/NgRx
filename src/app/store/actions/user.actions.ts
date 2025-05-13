import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ token: string }>(),
    'Login Failure': props<{ error: any }>(),

    'Create User': props<{ user: any }>(),
    'Create User Failure': props<{ error: any }>(),

    'Get All Users': emptyProps(),
    'Get All Users Success': props<{ users: User[] }>(),
    'Get All Users Failure': props<{ error: any }>()
  },
});
