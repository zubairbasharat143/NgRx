import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { menusActions } from '../../store/actions/menu.actions';

@Component({
  selector: 'app-assign-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './assign-report-dialog.component.html',
  styleUrls: ['./assign-report-dialog.component.scss'],
})
export class AssignDialogComponent implements OnInit {
  selectedUsers = new FormControl<number[]>([]);

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<AssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const existingUserIds: number[] = this.data.selected.assignedUsers;
    this.selectedUsers.setValue(existingUserIds);
  }

  handleAssign(): void {
    const selectedUserIds = (this.selectedUsers.value ?? []).map((id: any) => Number(id));
    const menuId = Number(this.data.selected.menu_id);

    const payload = {
      menu_id: menuId,
      userIds: selectedUserIds as number[],
    };

    const callback = (status: string, message: string) => {
      console.log(`${status}: ${message}`);
      this.dialogRef.close({ status, message });
    };

    this.store.dispatch(menusActions.assignMenu({ payload, callback }));
  }

  handleClose() {
    this.dialogRef.close();
  }

  get nameLabel(): string {
    switch (this.data?.contextType) {
      case 'menu':
        return 'Menu';
      case 'user':
        return 'User';
      case 'dashboard':
        return 'Dashboard';
      case 'stream':
        return 'Stream';
      default:
        return 'Report';
    }
  }
}
