import * as fromOrders from './orders.reducer';
import * as fromReturns from './returns.reducer';
import * as fromPaymentMethods from './payment-methods.reducer';
import * as fromDeliveryMethods from './delivery-methods.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { Action, combineReducers } from '@ngrx/store';

export const salesFeatureKey = 'sales';

export interface SalesState {
  [fromOrders.ordersFeatureKey]: fromOrders.State;
  [fromReturns.returnsFeatureKey]: fromReturns.State;
  [fromPaymentMethods.paymentMethodsFeatureKey]: fromPaymentMethods.State;
  [fromDeliveryMethods.deliveryMethodsFeatureKey]: fromDeliveryMethods.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [salesFeatureKey]: SalesState;
}

export const reducers = (state: SalesState | undefined, action: Action) =>
  combineReducers({
    [fromOrders.ordersFeatureKey]: fromOrders.reducer,
    [fromReturns.returnsFeatureKey]: fromReturns.reducer,
    [fromPaymentMethods.paymentMethodsFeatureKey]: fromPaymentMethods.reducer,
    [fromDeliveryMethods.deliveryMethodsFeatureKey]:
      fromDeliveryMethods.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
