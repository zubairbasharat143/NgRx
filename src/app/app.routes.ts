import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: PostsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'create-post', component: CreatePostComponent, canActivate: [authGuard] },
];
