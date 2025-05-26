import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userActions } from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private keycloakService: KeycloakService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(userActions.login({ email, password }));
    }
  }

  keycloakLogin() {
    this.keycloakService.login(); // Triggers redirect to Keycloak login
  }
}
