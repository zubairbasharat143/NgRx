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
import { ActivatedRoute, Router } from '@angular/router';
import { selectMenuById } from '../../store/selectors/menus.selectors';

@Component({
  selector: 'app-create-menu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.scss',
})
export class CreateMenuComponent {
  menuForm!: FormGroup;
  isEdit: boolean = false;
  editingMenuId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    this.menuForm.get('menuNameEn')?.valueChanges.subscribe(() => {
      this.securityTagVal();
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.editingMenuId = +id;

        this.store
          .select(selectMenuById(this.editingMenuId))
          .subscribe((menu: any | undefined) => {
            if (menu) {
              this.menuForm.patchValue({
                menuNameEn: menu.menu_name,
                menuDescriptionEn: menu.menu_desc,
                menuNameAr: menu.ar_menu_name,
                menuDescriptionAr: menu.ar_menu_desc,
                securityTag: menu.security_tag,
              });
            }
          });
      }
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

  securityTagVal() {
    const menuName = this.menuForm.get('menuNameEn')?.value;
    const securityTag = menuName
      ? menuName.replace(/\s+/g, '_').toLowerCase()
      : '';
    this.menuForm.patchValue({ securityTag });
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const payload = {
        menu_name: this.menuForm.value.menuNameEn,
        menu_desc: this.menuForm.value.menuDescriptionEn,
        ar_menu_name: this.menuForm.value.menuNameAr,
        ar_menu_desc: this.menuForm.value.menuDescriptionAr,
        security_tag: this.menuForm.value.securityTag,
        menu_status: 'active',
      };
      if (this.isEdit && this.editingMenuId !== null) {
        this.store.dispatch(
          menusActions.updateMenu({ id: this.editingMenuId, menu: payload })
        );
      } else {
        this.store.dispatch(menusActions.createMenu({ menu: payload }));
      }
      this.menuForm.reset();
      this.router.navigate(['/menus']);
    } else {
      console.log('Form Invalid');
    }
  }
}
