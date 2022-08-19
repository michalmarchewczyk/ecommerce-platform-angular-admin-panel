import { createReducer, on } from '@ngrx/store';
import { Order } from '../../../core/api';
import { OrdersActions } from '../actions';

export const ordersFeatureKey = 'orders';

export interface State {
  list: Order[];
  selectedOrderId: number | null;
}

export const initialState: State = {
  list: [],
  selectedOrderId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    OrdersActions.loadOrdersSuccess,
    (state, { orders }): State => ({
      ...state,
      list: orders,
    }),
  ),
  on(
    OrdersActions.selectOrder,
    (state, { orderId }): State => ({
      ...state,
      selectedOrderId: orderId,
    }),
  ),
  on(
    OrdersActions.getOrderSuccess,
    (state, { order }): State => ({
      ...state,
      list: state.list.map((o) => (o.id === order.id ? order : o)),
    }),
  ),
  on(
    OrdersActions.createOrderSuccess,
    (state, { order }): State => ({
      ...state,
      list: [...state.list, order],
    }),
  ),
  on(
    OrdersActions.updateOrderSuccess,
    (state, { orderId, order }): State => ({
      ...state,
      list: state.list.map((o) => (o.id === orderId ? order : o)),
    }),
  ),
);
