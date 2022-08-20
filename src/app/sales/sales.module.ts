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

@NgModule({
  declarations: [],
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
  ],
})
export class SalesModule {}
