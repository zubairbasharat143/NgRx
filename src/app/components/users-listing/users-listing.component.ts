import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../store/models/user.model';
import { Store, select } from '@ngrx/store';
import { userActions } from '../../store/actions/user.actions';
import { selectAllUsers } from '../../store/selectors/user.selectors';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-listing.component.html',
  styleUrl: './users-listing.component.scss'
})
export class UsersListingComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(userActions.getAllUsers());

    this.subscription = this.store.pipe(select(selectAllUsers))
      .subscribe((users) => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
