import { Component } from '@angular/core';
import { postsActions } from '../../store/actions/posts.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Post } from '../../store/models/post.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [CommonModule,RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone:true
})
export class PostsComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select((state) => state.posts.posts);
    this.loading$ = this.store.select((state) => state.posts.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(postsActions.loadPosts());
  }
}
