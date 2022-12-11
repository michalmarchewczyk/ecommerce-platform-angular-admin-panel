import { createReducer, on } from '@ngrx/store';
import { PaymentMethod } from '../../../core/api';
import { PaymentMethodsActions } from '../actions';

export const paymentMethodsFeatureKey = 'paymentMethods';

export interface State {
  list: PaymentMethod[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    PaymentMethodsActions.loadPaymentMethodsSuccess,
    (state, { paymentMethods }): State => ({
      ...state,
      list: paymentMethods,
    }),
  ),
  on(
    PaymentMethodsActions.createPaymentMethodSuccess,
    (state, { paymentMethod }): State => ({
      ...state,
      list: [...state.list, paymentMethod],
    }),
  ),
  on(
    PaymentMethodsActions.updatePaymentMethodSuccess,
    (state, { methodId, paymentMethod }): State => ({
      ...state,
      list: state.list.map((m) => (m.id === methodId ? paymentMethod : m)),
    }),
  ),
  on(
    PaymentMethodsActions.deletePaymentMethodSuccess,
    (state, { methodId }): State => ({
      ...state,
      list: state.list.filter((m) => m.id !== methodId),
    }),
  ),
);
