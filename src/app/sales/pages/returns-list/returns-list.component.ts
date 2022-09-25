import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ReturnsActions, selectReturnsListWithItems } from '../../store';
import { MatTableDataSource } from '@angular/material/table';
import { Return } from '../../../core/api';
import { MatSort } from '@angular/material/sort';
import { firstValueFrom, Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ReturnAddDialogComponent } from '../../components/return-add-dialog/return-add-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-returns-list',
  templateUrl: './returns-list.component.html',
  styleUrls: ['./returns-list.component.scss'],
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
export class ReturnsListComponent implements OnInit, OnDestroy, AfterViewInit {
  returns$ = this.store.select(selectReturnsListWithItems);
  dataSource = new MatTableDataSource<Return>();
  expandedReturn: Return | null = null;

  private subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit() {
    this.store.dispatch(ReturnsActions.loadReturns());
    this.dataSource.data = [];
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.returns$);
    this.subscription = this.returns$.subscribe((returns) => {
      this.dataSource.data = returns;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addReturn() {
    this.dialog.open(ReturnAddDialogComponent, {
      data: {
        orderId: null,
      },
      width: '360px',
    });
  }
}
