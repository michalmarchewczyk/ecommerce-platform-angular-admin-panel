import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product, ProductRating } from '../../../core/api';
import { Store } from '@ngrx/store';
import { ProductRatingsActions, selectProductRatings } from '../../store';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-product-ratings',
  templateUrl: './product-ratings.component.html',
  styleUrls: ['./product-ratings.component.scss'],
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
export class ProductRatingsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() product: Product | null = null;
  ratings$ = this.store.select(selectProductRatings(this.product?.id ?? -1));
  dataSource = new MatTableDataSource<ProductRating>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  expandedRating: ProductRating | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    if (!this.product) {
      return;
    }
    this.ratings$ = this.store.select(selectProductRatings(this.product.id));
    this.store.dispatch(
      ProductRatingsActions.loadProductRatings({ productId: this.product.id }),
    );
    this.dataSource.data = [];
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.ratings$);
    this.subscription = this.ratings$.subscribe((ratings) => {
      this.dataSource.data = ratings;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
