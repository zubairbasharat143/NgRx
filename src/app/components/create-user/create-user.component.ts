import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userActions } from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  standalone: true,
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      usr_first_name: ['', Validators.required],
      usr_last_name: ['', Validators.required],
      role: ['user', Validators.required], // default to 'user'
      usr_email_id: ['', [Validators.required, Validators.email]],
      usr_password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const usr_login_id = Date.now().toString(); // Generate login_id

      const userPayload = {
        usr_login_id,
        ...formData,
      };

      console.log('Submitted User:', userPayload);
      this.store.dispatch(userActions.createUser({ user: userPayload }));
    }
  }
}
