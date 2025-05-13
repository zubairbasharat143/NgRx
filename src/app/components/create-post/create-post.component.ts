import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { postsActions } from '../../store/actions/posts.actions';
import { Post } from '../../store/models/post.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
})
export class CreatePostComponent {
  postForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      userId: 1,
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
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

      this.router.navigate(['']);
    }
  }
}
