import { createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';
import { selectSalesState } from './index';
import { Order } from '../../../core/api';

export const selectOrdersState = createSelector(
  selectSalesState,
  (state) => state[fromOrders.ordersFeatureKey],
);

export const selectOrdersList = createSelector(
  selectOrdersState,
  (state) => state.list,
);

export const selectOrdersListWithItems = createSelector(
  selectOrdersList,
  (orders): (Order & { itemsCount: number; itemsTotal: number })[] =>
    orders.map((order) => ({
      ...order,
      itemsCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
      itemsTotal: order.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      ),
    })),
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
