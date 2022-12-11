import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions, selectProductsList } from '../../store';
import { Product } from '../../../core/api';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, AfterViewInit, OnDestroy {
  products$ = this.store.select(selectProductsList);
  dataSource = new MatTableDataSource<Product>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, public router: Router) {}

  ngOnInit() {
    this.dataSource.data = [];
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.products$);
    this.subscription = this.products$.subscribe((products) => {
      this.dataSource.data = products;
    });
    this.store.dispatch(ProductsActions.loadProducts());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
