import { createSelector } from '@ngrx/store';
import { selectSalesState } from '.';
import * as fromPaymentMethods from '../reducers/payment-methods.reducer';

export const selectPaymentMethodsState = createSelector(
  selectSalesState,
  (state) => state[fromPaymentMethods.paymentMethodsFeatureKey],
);

export const selectPaymentMethodsList = createSelector(
  selectPaymentMethodsState,
  (state) => state.list,
);
