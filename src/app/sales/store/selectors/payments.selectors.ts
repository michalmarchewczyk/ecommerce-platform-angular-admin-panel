import { createSelector } from '@ngrx/store';
import { selectSalesState } from '.';
import * as fromPayments from '../reducers/payments.reducer';

export const selectPaymentsState = createSelector(
  selectSalesState,
  (state) => state[fromPayments.paymentsFeatureKey],
);

export const selectPaymentsList = createSelector(
  selectPaymentsState,
  (state) => state.list,
);
