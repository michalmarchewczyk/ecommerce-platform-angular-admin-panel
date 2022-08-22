import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromSales from './store';
import { EffectsModule } from '@ngrx/effects';
import {
  DeliveriesEffects,
  OrdersEffects,
  PaymentsEffects,
  ReturnsEffects,
} from './store/effects';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { DeliveryMethodsComponent } from './pages/delivery-methods/delivery-methods.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { CreateOrderFormComponent } from './pages/create-order-form/create-order-form.component';
import { CreateReturnFormComponent } from './pages/create-return-form/create-return-form.component';
import { ReturnsListComponent } from './pages/returns-list/returns-list.component';
import { ReturnComponent } from './pages/return/return.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from '../core/auth/auth.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { PaymentMethodsListComponent } from './components/payment-methods-list/payment-methods-list.component';
import { PaymentMethodDetailComponent } from './components/payment-method-detail/payment-method-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    OrdersComponent,
    ReturnsComponent,
    PaymentMethodsComponent,
    DeliveryMethodsComponent,
    OrderComponent,
    OrdersListComponent,
    CreateOrderFormComponent,
    CreateReturnFormComponent,
    ReturnsListComponent,
    ReturnComponent,
    PaymentMethodsListComponent,
    PaymentMethodDetailComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    StoreModule.forFeature(fromSales.salesFeatureKey, fromSales.reducers),
    EffectsModule.forFeature([
      OrdersEffects,
      ReturnsEffects,
      PaymentsEffects,
      DeliveriesEffects,
    ]),
    MatButtonModule,
    AuthModule,
    MatIconModule,
    MatTableModule,
    SharedModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class SalesModule {}
