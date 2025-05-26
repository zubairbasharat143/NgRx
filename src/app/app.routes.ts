import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/posts/posts.component').then(
            (m) => m.PostsComponent
          ),
      },
      {
        path: 'create-post',
        loadComponent: () =>
          import('./components/create-post/create-post.component').then(
            (m) => m.CreatePostComponent
          ),
      },
      {
        path: 'users-listing',
        loadComponent: () =>
          import('./components/users-listing/users-listing.component').then(
            (m) => m.UsersListingComponent
          ),
      },
      {
        path: 'create-user',
        loadComponent: () =>
          import('./components/create-user/create-user.component').then(
            (m) => m.CreateUserComponent
          ),
      },
      {
        path: 'edit-user/:id',
        loadComponent: () =>
          import('./components/create-user/create-user.component').then(
            (m) => m.CreateUserComponent
          ),
      },
      {
        path: 'menus',
        loadComponent: () =>
          import('./components/menus/menus.component').then(
            (m) => m.MenusComponent
          ),
      },
      {
        path: 'create-menu',
        loadComponent: () =>
          import('./components/create-menu/create-menu.component').then(
            (m) => m.CreateMenuComponent
          ),
      },
      {
        path: 'edit-menu/:id',
        loadComponent: () =>
          import('./components/create-menu/create-menu.component').then(
            (m) => m.CreateMenuComponent
          ),
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];
