import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/auth.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersListingComponent } from './components/users-listing/users-listing.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

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
    ],
  },
  { path: 'login', component: LoginComponent },
];
