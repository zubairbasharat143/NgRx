import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { menusActions } from '../../store/actions/menu.actions';
import { selectAllMenus } from '../../store/selectors/menus.selectors';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssignDialogComponent } from '../assign-report-dialog/assign-report-dialog.component';
import { selectAllUsers } from '../../store/selectors/user.selectors';
import { userActions } from '../../store/actions/user.actions';

@Component({
  selector: 'app-menus',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  menus: any[] = [];
  private subscription!: Subscription;
  users: any[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(menusActions.loadMenus());
    this.store.dispatch(userActions.getAllUsers());

    this.subscription = this.store
      .pipe(select(selectAllMenus))
      .subscribe((menus) => {
        this.menus = menus;
      });

    this.store.pipe(select(selectAllUsers)).subscribe((users) => {
      this.users = users.filter((user) => user.usr_status !== 'deleted');
    });
  }

  openAssignDialog(selectedItem: any): void {
    const assignedUsers = JSON.parse(selectedItem.assignedUsers)
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      data: {
        selected: {...selectedItem, assignedUsers},
        users: this.users,
        contextType: 'menu',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.status === 'success') {
        // Optionally reload menus or show success
        this.store.dispatch(menusActions.loadMenus());
      }
    });
  }

  editMenu(menuId: number): void {
    this.router.navigate([`/edit-menu/${menuId}`]);
  }

  deleteMenu(menuId: number): void {
    this.store.dispatch(menusActions.deleteMenu({ menuId }));
  }
}
