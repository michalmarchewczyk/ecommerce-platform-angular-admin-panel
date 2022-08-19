import * as fromOrders from './orders.reducer';
import * as fromReturns from './returns.reducer';
import * as fromPayments from './payments.reducer';
import * as fromDeliveries from './deliveries.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { Action, combineReducers } from '@ngrx/store';

export const salesFeatureKey = 'sales';

export interface SalesState {
  [fromOrders.ordersFeatureKey]: fromOrders.State;
  [fromReturns.returnsFeatureKey]: fromReturns.State;
  [fromPayments.paymentsFeatureKey]: fromPayments.State;
  [fromDeliveries.deliveriesFeatureKey]: fromDeliveries.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [salesFeatureKey]: SalesState;
}

export const reducers = (state: SalesState | undefined, action: Action) =>
  combineReducers({
    [fromOrders.ordersFeatureKey]: fromOrders.reducer,
    [fromReturns.returnsFeatureKey]: fromReturns.reducer,
    [fromPayments.paymentsFeatureKey]: fromPayments.reducer,
    [fromDeliveries.deliveriesFeatureKey]: fromDeliveries.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
