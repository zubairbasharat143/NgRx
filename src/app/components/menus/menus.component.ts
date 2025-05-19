import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { menusActions } from '../../store/actions/menu.actions';
import { selectAllMenus } from '../../store/selectors/menus.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss',
})
export class MenusComponent implements OnInit {
  menus: any[] = [];
  private subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(menusActions.loadMenus());

    this.subscription = this.store
      .pipe(select(selectAllMenus))
      .subscribe((menus) => {
        console.log('Menus:', menus);
        this.menus = menus;
      });
  }

  deleteMenu(menuId: number): void {
    this.store.dispatch(menusActions.deleteMenu({ menuId }));
  }
}
