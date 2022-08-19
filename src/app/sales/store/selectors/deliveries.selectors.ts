import { createSelector } from '@ngrx/store';
import { selectSalesState } from '.';
import * as fromDeliveries from '../reducers/deliveries.reducer';

export const selectDeliveriesState = createSelector(
  selectSalesState,
  (state) => state[fromDeliveries.deliveriesFeatureKey],
);

export const selectDeliveriesList = createSelector(
  selectDeliveriesState,
  (state) => state.list,
);
