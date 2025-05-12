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
  error: any;
  loading: boolean;
}