import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PaymentMethodsActions, selectPaymentMethodsList } from '../../store';
import { PaymentMethod } from '../../../core/api';
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
  selector: 'app-payment-methods-list',
  templateUrl: './payment-methods-list.component.html',
  styleUrls: ['./payment-methods-list.component.scss'],
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
export class PaymentMethodsListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  paymentMethods$ = this.store.select(selectPaymentMethodsList);
  expandedPaymentMethod: PaymentMethod | null = null;
  dataSource = new MatTableDataSource<PaymentMethod>();
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
    this.dataSource.data = await firstValueFrom(this.paymentMethods$);
    this.subscription = this.paymentMethods$.subscribe((paymentMethods) => {
      this.dataSource.data = paymentMethods;
    });
    this.store.dispatch(PaymentMethodsActions.loadPaymentMethods());
    this.dataSource.sort = this.sort;
  }
}
