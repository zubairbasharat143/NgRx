import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { Observable } from 'rxjs';
import { Post } from './store/models/post.model';
import { CommonModule } from '@angular/common';
import { postsActions } from './store/actions/posts.actions';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  postForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.posts$ = this.store.select((state) => state.posts.posts);
    this.loading$ = this.store.select((state) => state.posts.loading);
    this.postForm = this.fb.group({
      userId: 1,
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  loadPosts() {
    this.store.dispatch(postsActions.loadPosts());
  }

  createPost(): void {
    if (this.postForm.valid) {
      const post: Post = {
        userId: 1,
        id: Date.now(),
        ...this.postForm.value,
      };

      this.store.dispatch(postsActions.createPost({ post }));

      this.postForm.reset({
        title: '',
        body: '',
        userId: 1,
      });
    }
  }
}
