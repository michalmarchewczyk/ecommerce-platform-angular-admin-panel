import { createAction, props } from '@ngrx/store';
import { DeliveryMethod, DeliveryMethodDto } from '../../../core/api';

export const loadDeliveryMethods = createAction(
  '[DeliveryMethods] Load Delivery Methods',
);

export const loadDeliveryMethodsSuccess = createAction(
  '[DeliveryMethods] Load Delivery Methods Success',
  props<{ deliveryMethods: DeliveryMethod[] }>(),
);

export const loadDeliveryMethodsFailure = createAction(
  '[DeliveryMethods] Load Delivery Methods Failure',
  props<{ error: string }>(),
);

export const createDeliveryMethod = createAction(
  '[DeliveryMethods] Create Delivery Method',
  props<{ data: DeliveryMethodDto }>(),
);

export const createDeliveryMethodSuccess = createAction(
  '[DeliveryMethods] Create Delivery Method Success',
  props<{ deliveryMethod: DeliveryMethod }>(),
);

export const createDeliveryMethodFailure = createAction(
  '[DeliveryMethods] Create Delivery Method Failure',
  props<{ error: string }>(),
);

export const updateDeliveryMethod = createAction(
  '[DeliveryMethods] Update Delivery Method',
  props<{ methodId: number; data: DeliveryMethodDto }>(),
);

export const updateDeliveryMethodSuccess = createAction(
  '[DeliveryMethods] Update Delivery Method Success',
  props<{ methodId: number; deliveryMethod: DeliveryMethod }>(),
);

export const updateDeliveryMethodFailure = createAction(
  '[DeliveryMethods] Update Delivery Method Failure',
  props<{ error: string }>(),
);

export const deleteDeliveryMethod = createAction(
  '[DeliveryMethods] Delete Delivery Method',
  props<{ methodId: number }>(),
);

export const deleteDeliveryMethodSuccess = createAction(
  '[DeliveryMethods] Delete Delivery Method Success',
  props<{ methodId: number }>(),
);

export const deleteDeliveryMethodFailure = createAction(
  '[DeliveryMethods] Delete Delivery Method Failure',
  props<{ error: string }>(),
);
