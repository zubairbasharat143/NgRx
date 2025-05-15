import { User } from './user.model';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: any;
}

export interface UserState {
  posts: Post[];
  users: User[];
  error: any;
  loading: boolean;
  token?: string;
}
