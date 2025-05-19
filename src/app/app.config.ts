import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './store/effects/posts.effects';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { UserEffects } from './store/effects/user.effects';
import { MenusEffects } from './store/effects/menus.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects([PostsEffects,UserEffects,MenusEffects]),
  ],
};
