import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../store';
import { selectUsersList } from '../../store/selectors/accounts.selectors';
import { User } from '../../../core/api';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  users$ = this.store.select(selectUsersList);
  expandedUser: User | null = null;
  dataSource = new MatTableDataSource<User>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.data = [];
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.users$);
    this.dataSource.paginator = this.paginator;
    this.subscription = this.users$.subscribe((users) => {
      this.dataSource.data = users;
    });
    this.store.dispatch(UsersActions.loadUsers());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
