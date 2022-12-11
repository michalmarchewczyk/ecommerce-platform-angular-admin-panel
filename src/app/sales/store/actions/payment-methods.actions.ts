import { createAction, props } from '@ngrx/store';
import { PaymentMethod, PaymentMethodDto } from '../../../core/api';

export const loadPaymentMethods = createAction(
  '[PaymentMethods] Load Payment Methods',
);

export const loadPaymentMethodsSuccess = createAction(
  '[PaymentMethods] Load Payment Methods Success',
  props<{ paymentMethods: PaymentMethod[] }>(),
);

export const loadPaymentMethodsFailure = createAction(
  '[PaymentMethods] Load Payment Methods Failure',
  props<{ error: string }>(),
);

export const createPaymentMethod = createAction(
  '[PaymentMethods] Create Payment Method',
  props<{ data: PaymentMethodDto }>(),
);

export const createPaymentMethodSuccess = createAction(
  '[PaymentMethods] Create Payment Method Success',
  props<{ paymentMethod: PaymentMethod }>(),
);

export const createPaymentMethodFailure = createAction(
  '[PaymentMethods] Create Payment Method Failure',
  props<{ error: string }>(),
);

export const updatePaymentMethod = createAction(
  '[PaymentMethods] Update Payment Method',
  props<{ methodId: number; data: PaymentMethodDto }>(),
);

export const updatePaymentMethodSuccess = createAction(
  '[PaymentMethods] Update Payment Method Success',
  props<{ methodId: number; paymentMethod: PaymentMethod }>(),
);

export const updatePaymentMethodFailure = createAction(
  '[PaymentMethods] Update Payment Method Failure',
  props<{ error: string }>(),
);

export const deletePaymentMethod = createAction(
  '[PaymentMethods] Delete Payment Method',
  props<{ methodId: number }>(),
);

export const deletePaymentMethodSuccess = createAction(
  '[PaymentMethods] Delete Payment Method Success',
  props<{ methodId: number }>(),
);

export const deletePaymentMethodFailure = createAction(
  '[PaymentMethods] Delete Payment Method Failure',
  props<{ error: string }>(),
);
