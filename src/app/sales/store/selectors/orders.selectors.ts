import { createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';
import { selectSalesState } from './index';

export const selectOrdersState = createSelector(
  selectSalesState,
  (state) => state[fromOrders.ordersFeatureKey],
);

export const selectOrdersList = createSelector(
  selectOrdersState,
  (state) => state.list,
);

export const selectSelectedOrderId = createSelector(
  selectOrdersState,
  (state) => state.selectedOrderId,
);

export const selectSelectedOrder = createSelector(
  selectOrdersState,
  selectSelectedOrderId,
  (state, selectedOrderId) => {
    return selectedOrderId
      ? state.list.find((o) => o.id === selectedOrderId)
      : null;
  },
);
