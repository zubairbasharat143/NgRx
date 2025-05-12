import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './store/effects/posts.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects([PostsEffects]),
  ],
};
