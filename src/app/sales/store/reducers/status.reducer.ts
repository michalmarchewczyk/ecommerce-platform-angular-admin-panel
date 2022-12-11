import { createReducer, on } from '@ngrx/store';
import {
  DeliveryMethodsActions,
  OrdersActions,
  PaymentMethodsActions,
  ReturnsActions,
} from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
  newOrderId: number | null;
}

export const initialState: State = {
  error: null,
  loading: false,
  newOrderId: null,
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
    PaymentMethodsActions.loadPaymentMethods,
    PaymentMethodsActions.createPaymentMethod,
    PaymentMethodsActions.updatePaymentMethod,
    PaymentMethodsActions.deletePaymentMethod,
    DeliveryMethodsActions.loadDeliveryMethods,
    DeliveryMethodsActions.createDeliveryMethod,
    DeliveryMethodsActions.updateDeliveryMethod,
    DeliveryMethodsActions.deleteDeliveryMethod,
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
    PaymentMethodsActions.loadPaymentMethodsSuccess,
    PaymentMethodsActions.createPaymentMethodSuccess,
    PaymentMethodsActions.updatePaymentMethodSuccess,
    PaymentMethodsActions.deletePaymentMethodSuccess,
    DeliveryMethodsActions.loadDeliveryMethodsSuccess,
    DeliveryMethodsActions.createDeliveryMethodSuccess,
    DeliveryMethodsActions.updateDeliveryMethodSuccess,
    DeliveryMethodsActions.deleteDeliveryMethodSuccess,
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
    PaymentMethodsActions.loadPaymentMethodsFailure,
    PaymentMethodsActions.createPaymentMethodFailure,
    PaymentMethodsActions.updatePaymentMethodFailure,
    PaymentMethodsActions.deletePaymentMethodFailure,
    DeliveryMethodsActions.loadDeliveryMethodsFailure,
    DeliveryMethodsActions.createDeliveryMethodFailure,
    DeliveryMethodsActions.updateDeliveryMethodFailure,
    DeliveryMethodsActions.deleteDeliveryMethodFailure,
    (state, { error }): State => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(
    OrdersActions.createOrderSuccess,
    (state, { order }): State => ({
      ...state,
      newOrderId: order.id,
    }),
  ),
);
