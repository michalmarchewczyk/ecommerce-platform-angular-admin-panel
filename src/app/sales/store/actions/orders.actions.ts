import { createAction, props } from '@ngrx/store';
import { Order, OrderCreateDto, OrderUpdateDto } from '../../../core/api';

export const loadOrders = createAction('[Orders] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>(),
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: string }>(),
);

export const selectOrder = createAction(
  '[Orders] Select Order',
  props<{ orderId: number | null }>(),
);

export const selectOrderNumber = createAction(
  '[Orders] Select Order',
  props<{ orderId: number }>(),
);

export const getOrder = createAction(
  '[Orders] Get Order',
  props<{ orderId: number }>(),
);

export const getOrderSuccess = createAction(
  '[Orders] Get Order Success',
  props<{ order: Order }>(),
);

export const getOrderFailure = createAction(
  '[Orders] Get Order Failure',
  props<{ error: string }>(),
);

export const createOrder = createAction(
  '[Orders] Create Order',
  props<{ data: OrderCreateDto }>(),
);

export const createOrderSuccess = createAction(
  '[Orders] Create Order Success',
  props<{ order: Order }>(),
);

export const createOrderFailure = createAction(
  '[Orders] Create Order Failure',
  props<{ error: string }>(),
);

export const updateOrder = createAction(
  '[Orders] Update Order',
  props<{ orderId: number; data: OrderUpdateDto }>(),
);

export const updateOrderSuccess = createAction(
  '[Orders] Update Order Success',
  props<{ orderId: number; order: Order }>(),
);

export const updateOrderFailure = createAction(
  '[Orders] Update Order Failure',
  props<{ error: string }>(),
);
