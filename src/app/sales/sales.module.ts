import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromSales from './store';
import { EffectsModule } from '@ngrx/effects';
import {
  DeliveryMethodsEffects,
  OrdersEffects,
  PaymentMethodsEffects,
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PaymentMethodAddFormComponent } from './components/payment-method-add-form/payment-method-add-form.component';
import { DeliveryMethodsListComponent } from './components/delivery-methods-list/delivery-methods-list.component';
import { DeliveryMethodDetailComponent } from './components/delivery-method-detail/delivery-method-detail.component';
import { DeliveryMethodAddFormComponent } from './components/delivery-method-add-form/delivery-method-add-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderItemsComponent } from './components/order-items/order-items.component';
import { CatalogModule } from '../catalog/catalog.module';
import { EditOrderFormComponent } from './components/edit-order-form/edit-order-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { OrderItemsInputComponent } from './components/order-items-input/order-items-input.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReturnDetailComponent } from './components/return-detail/return-detail.component';
import { ReturnAddDialogComponent } from './components/return-add-dialog/return-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

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
    PaymentMethodAddFormComponent,
    DeliveryMethodsListComponent,
    DeliveryMethodDetailComponent,
    DeliveryMethodAddFormComponent,
    OrderDetailsComponent,
    OrderItemsComponent,
    EditOrderFormComponent,
    OrderItemsInputComponent,
    ReturnDetailComponent,
    ReturnAddDialogComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    StoreModule.forFeature(fromSales.salesFeatureKey, fromSales.reducers),
    EffectsModule.forFeature([
      OrdersEffects,
      ReturnsEffects,
      PaymentMethodsEffects,
      DeliveryMethodsEffects,
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
    MatTabsModule,
    CatalogModule,
    MatSelectModule,
    MatDividerModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxMatIntlTelInputComponent,
  ],
})
export class SalesModule {}
