import { createReducer, on } from '@ngrx/store';
import {
  DeliveriesActions,
  OrdersActions,
  PaymentsActions,
  ReturnsActions,
} from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    OrdersActions.loadOrders,
    OrdersActions.getOrder,
    OrdersActions.createOrder,
    OrdersActions.updateOrder,
    ReturnsActions.loadReturns,
    ReturnsActions.getReturn,
    ReturnsActions.createReturn,
    ReturnsActions.updateReturn,
    PaymentsActions.loadPaymentMethods,
    PaymentsActions.createPaymentMethod,
    PaymentsActions.updatePaymentMethod,
    PaymentsActions.deletePaymentMethod,
    DeliveriesActions.loadDeliveryMethods,
    DeliveriesActions.createDeliveryMethod,
    DeliveriesActions.updateDeliveryMethod,
    DeliveriesActions.deleteDeliveryMethod,
    (state): State => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    OrdersActions.loadOrdersSuccess,
    OrdersActions.getOrderSuccess,
    OrdersActions.createOrderSuccess,
    OrdersActions.updateOrderSuccess,
    ReturnsActions.loadReturnsSuccess,
    ReturnsActions.getReturnSuccess,
    ReturnsActions.createReturnSuccess,
    ReturnsActions.updateReturnSuccess,
    PaymentsActions.loadPaymentMethodsSuccess,
    PaymentsActions.createPaymentMethodSuccess,
    PaymentsActions.updatePaymentMethodSuccess,
    PaymentsActions.deletePaymentMethodSuccess,
    DeliveriesActions.loadDeliveryMethodsSuccess,
    DeliveriesActions.createDeliveryMethodSuccess,
    DeliveriesActions.updateDeliveryMethodSuccess,
    DeliveriesActions.deleteDeliveryMethodSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    OrdersActions.loadOrdersFailure,
    OrdersActions.getOrderFailure,
    OrdersActions.createOrderFailure,
    OrdersActions.updateOrderFailure,
    ReturnsActions.loadReturnsFailure,
    ReturnsActions.getReturnFailure,
    ReturnsActions.createReturnFailure,
    ReturnsActions.updateReturnFailure,
    PaymentsActions.loadPaymentMethodsFailure,
    PaymentsActions.createPaymentMethodFailure,
    PaymentsActions.updatePaymentMethodFailure,
    PaymentsActions.deletePaymentMethodFailure,
    DeliveriesActions.loadDeliveryMethodsFailure,
    DeliveriesActions.createDeliveryMethodFailure,
    DeliveriesActions.updateDeliveryMethodFailure,
    DeliveriesActions.deleteDeliveryMethodFailure,
    (state, { error }): State => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
