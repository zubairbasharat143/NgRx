import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { userActions } from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../store/models/user.model';
import { selectUserById } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  standalone: true,
})
export class CreateUserComponent {
  userForm!: FormGroup;
  isEdit = false;
  editingUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.editingUserId = +id;
      }

      this.userForm = this.fb.group({
        usr_first_name: ['', Validators.required],
        usr_last_name: ['', Validators.required],
        role: ['', Validators.required],
        usr_email_id: ['', [Validators.required, Validators.email]],
        usr_password: ['', this.isEdit ? [] : [Validators.required]],
      });

      if (this.isEdit && this.editingUserId !== null) {
        this.store
          .select(selectUserById(this.editingUserId))
          .subscribe((user: User | undefined) => {
            if (user) {
              this.userForm.patchValue(user);
            }
          });
      }
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      let formData = this.userForm.value;

      if (this.isEdit && this.editingUserId !== null) {
        // Remove password if it's blank or untouched
        if (!formData.usr_password) {
          const { usr_password, ...rest } = formData;
          formData = rest;
        }

        const payload = { usr_id_pk: this.editingUserId, ...formData };
        this.store.dispatch(userActions.updateUser({ user: payload }));
      } else {
        const payload = {
          usr_login_id: Date.now().toString(),
          ...formData,
        };
        this.store.dispatch(userActions.createUser({ user: payload }));
      }
    }
  }
}
