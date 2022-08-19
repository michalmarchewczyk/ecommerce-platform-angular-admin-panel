import { createAction, props } from '@ngrx/store';
import { PaymentMethod, PaymentMethodDto } from '../../../core/api';

export const loadPaymentMethods = createAction(
  '[Payments] Load Payment Methods',
);

export const loadPaymentMethodsSuccess = createAction(
  '[Payments] Load Payment Methods Success',
  props<{ paymentMethods: PaymentMethod[] }>(),
);

export const loadPaymentMethodsFailure = createAction(
  '[Payments] Load Payment Methods Failure',
  props<{ error: string }>(),
);

export const createPaymentMethod = createAction(
  '[Payments] Create Payment Method',
  props<{ data: PaymentMethodDto }>(),
);

export const createPaymentMethodSuccess = createAction(
  '[Payments] Create Payment Method Success',
  props<{ paymentMethod: PaymentMethod }>(),
);

export const createPaymentMethodFailure = createAction(
  '[Payments] Create Payment Method Failure',
  props<{ error: string }>(),
);

export const updatePaymentMethod = createAction(
  '[Payments] Update Payment Method',
  props<{ methodId: number; data: PaymentMethodDto }>(),
);

export const updatePaymentMethodSuccess = createAction(
  '[Payments] Update Payment Method Success',
  props<{ methodId: number; paymentMethod: PaymentMethod }>(),
);

export const updatePaymentMethodFailure = createAction(
  '[Payments] Update Payment Method Failure',
  props<{ error: string }>(),
);

export const deletePaymentMethod = createAction(
  '[Payments] Delete Payment Method',
  props<{ methodId: number }>(),
);

export const deletePaymentMethodSuccess = createAction(
  '[Payments] Delete Payment Method Success',
  props<{ methodId: number }>(),
);

export const deletePaymentMethodFailure = createAction(
  '[Payments] Delete Payment Method Failure',
  props<{ error: string }>(),
);
