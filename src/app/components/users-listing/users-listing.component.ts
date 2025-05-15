import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../store/models/user.model';
import { Store, select } from '@ngrx/store';
import { userActions } from '../../store/actions/user.actions';
import { selectAllUsers } from '../../store/selectors/user.selectors';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './users-listing.component.html',
  styleUrl: './users-listing.component.scss',
})
export class UsersListingComponent implements OnInit {
  users: User[] = [];
  private subscription!: Subscription;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(userActions.getAllUsers());

    this.subscription = this.store
      .pipe(select(selectAllUsers))
      .subscribe((users) => {
        this.users = users.filter((user) => user.usr_status !== 'deleted');
      });
  }

  editUser(userId: number): void {
    this.router.navigate([`/edit-user/${userId}`]);
  }

  deleteUser(userId: number): void {
    const payload = {
      usr_id_pk: userId,
      usr_status: 'deleted',
    };
    this.store.dispatch(userActions.updateUser({ user: payload }));
  }
}
