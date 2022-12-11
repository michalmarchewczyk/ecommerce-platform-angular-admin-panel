import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DeliveryMethodsActions, selectDeliveryMethodsList } from '../../store';
import { DeliveryMethod } from '../../../core/api';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-delivery-methods-list',
  templateUrl: './delivery-methods-list.component.html',
  styleUrls: ['./delivery-methods-list.component.scss'],
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
export class DeliveryMethodsListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  deliveryMethods$ = this.store.select(selectDeliveryMethodsList);
  expandedDeliveryMethod: DeliveryMethod | null = null;
  dataSource = new MatTableDataSource<DeliveryMethod>();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.dataSource.data = [];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async ngAfterViewInit() {
    this.dataSource.data = await firstValueFrom(this.deliveryMethods$);
    this.subscription = this.deliveryMethods$.subscribe((deliveryMethods) => {
      this.dataSource.data = deliveryMethods;
    });
    this.store.dispatch(DeliveryMethodsActions.loadDeliveryMethods());
    this.dataSource.sort = this.sort;
  }
}
