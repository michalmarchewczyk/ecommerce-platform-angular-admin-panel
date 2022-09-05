import { createSelector } from '@ngrx/store';
import { selectSalesState } from './index';
import * as fromStatus from '../reducers/status.reducer';

export const selectSalesStatusState = createSelector(
  selectSalesState,
  (state) => state[fromStatus.statusFeatureKey],
);

export const selectSalesError = createSelector(
  selectSalesStatusState,
  (state) => state.error,
);

export const selectSalesLoading = createSelector(
  selectSalesStatusState,
  (state) => state.loading,
);

export const selectNewOrderId = createSelector(
  selectSalesStatusState,
  (state) => state.newOrderId,
);
