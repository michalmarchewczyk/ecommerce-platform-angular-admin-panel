import { createAction, props } from '@ngrx/store';
import { DeliveryMethod, DeliveryMethodDto } from '../../../core/api';

export const loadDeliveryMethods = createAction(
  '[Deliveries] Load Delivery Methods',
);

export const loadDeliveryMethodsSuccess = createAction(
  '[Deliveries] Load Delivery Methods Success',
  props<{ deliveryMethods: DeliveryMethod[] }>(),
);

export const loadDeliveryMethodsFailure = createAction(
  '[Deliveries] Load Delivery Methods Failure',
  props<{ error: string }>(),
);

export const createDeliveryMethod = createAction(
  '[Deliveries] Create Delivery Method',
  props<{ data: DeliveryMethodDto }>(),
);

export const createDeliveryMethodSuccess = createAction(
  '[Deliveries] Create Delivery Method Success',
  props<{ deliveryMethod: DeliveryMethod }>(),
);

export const createDeliveryMethodFailure = createAction(
  '[Deliveries] Create Delivery Method Failure',
  props<{ error: string }>(),
);

export const updateDeliveryMethod = createAction(
  '[Deliveries] Update Delivery Method',
  props<{ methodId: number; data: DeliveryMethodDto }>(),
);

export const updateDeliveryMethodSuccess = createAction(
  '[Deliveries] Update Delivery Method Success',
  props<{ methodId: number; deliveryMethod: DeliveryMethod }>(),
);

export const updateDeliveryMethodFailure = createAction(
  '[Deliveries] Update Delivery Method Failure',
  props<{ error: string }>(),
);

export const deleteDeliveryMethod = createAction(
  '[Deliveries] Delete Delivery Method',
  props<{ methodId: number }>(),
);

export const deleteDeliveryMethodSuccess = createAction(
  '[Deliveries] Delete Delivery Method Success',
  props<{ methodId: number }>(),
);

export const deleteDeliveryMethodFailure = createAction(
  '[Deliveries] Delete Delivery Method Failure',
  props<{ error: string }>(),
);
