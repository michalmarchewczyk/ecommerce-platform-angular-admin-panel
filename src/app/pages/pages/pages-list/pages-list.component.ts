import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PagesActions, selectPagesList } from '../../store';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../../../core/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss'],
})
export class PagesListComponent implements OnInit, AfterViewInit, OnDestroy {
  pages$ = this.store.select(selectPagesList);
  dataSource = new MatTableDataSource<Page>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.data = [];
    this.store.dispatch(PagesActions.loadPages());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.pages$);
    this.subscription = this.pages$.subscribe((pages) => {
      this.dataSource.data = pages;
    });
    this.store.dispatch(PagesActions.loadPages());
    this.dataSource.sort = this.sort;
  }
}
