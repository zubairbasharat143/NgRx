import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/auth.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersListingComponent } from './components/users-listing/users-listing.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MenusComponent } from './components/menus/menus.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: PostsComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'users-listing', component: UsersListingComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'edit-user/:id', component: CreateUserComponent },
      { path: 'menus', component: MenusComponent },
      { path: 'create-menu', component: CreateMenuComponent },
      { path: 'edit-menu/:id', component: CreateMenuComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];
