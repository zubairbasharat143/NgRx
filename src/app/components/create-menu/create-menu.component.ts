import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { menusActions } from '../../store/actions/menu.actions';

@Component({
  selector: 'app-create-menu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.scss',
})
export class CreateMenuComponent {
  isEdit: boolean = false;
  menuForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.menuForm = this.fb.group({
      menuNameEn: ['', Validators.required],
      menuDescriptionEn: ['', Validators.required],
      menuNameAr: [
        '',
        Validators.compose([
          Validators.required,
          this.arabicValidator(
            'Arabic Menu Name must contain only Arabic characters and numbers'
          ),
        ]),
      ],
      menuDescriptionAr: [
        '',
        Validators.compose([
          Validators.required,
          this.arabicValidator(
            'Arabic Menu Description must contain only Arabic characters and numbers'
          ),
        ]),
      ],
      securityTag: [''],
    });
  }

  // Custom Arabic Validator
  arabicValidator(errorMsg: string) {
    const arabicRegex = /^[\u0600-\u06FF\s0-9٠-٩]+$/;
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) return null; // Let Validators.required handle empty check
      return arabicRegex.test(value) ? null : { arabicInvalid: errorMsg };
    };
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const payload = {
        menu_name: this.menuForm.value.menuNameEn,
        menu_desc: this.menuForm.value.menuDescriptionEn,
        ar_menu_name: this.menuForm.value.menuNameAr,
        ar_menu_desc: this.menuForm.value.menuDescriptionAr,
        security_tag: this.menuForm.value.menuNameEn,
        menu_status: 'active',
      };
      this.store.dispatch(menusActions.createMenu({ menu: payload }));
      this.menuForm.reset();
    } else {
      console.log('Form Invalid');
    }
  }
  
}
