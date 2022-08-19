import { createReducer, on } from '@ngrx/store';
import { PaymentMethod } from '../../../core/api';
import { PaymentsActions } from '../actions';

export const paymentsFeatureKey = 'payments';

export interface State {
  list: PaymentMethod[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    PaymentsActions.loadPaymentMethodsSuccess,
    (state, { paymentMethods }): State => ({
      ...state,
      list: paymentMethods,
    }),
  ),
  on(
    PaymentsActions.createPaymentMethodSuccess,
    (state, { paymentMethod }): State => ({
      ...state,
      list: [...state.list, paymentMethod],
    }),
  ),
  on(
    PaymentsActions.updatePaymentMethodSuccess,
    (state, { methodId, paymentMethod }): State => ({
      ...state,
      list: state.list.map((m) => (m.id === methodId ? paymentMethod : m)),
    }),
  ),
  on(
    PaymentsActions.deletePaymentMethodSuccess,
    (state, { methodId }): State => ({
      ...state,
      list: state.list.filter((m) => m.id !== methodId),
    }),
  ),
);
