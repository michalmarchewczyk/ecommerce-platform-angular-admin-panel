import { createSelector } from '@ngrx/store';
import { selectSalesState } from '.';
import * as fromDeliveryMethods from '../reducers/delivery-methods.reducer';

export const selectDeliveryMethodsState = createSelector(
  selectSalesState,
  (state) => state[fromDeliveryMethods.deliveryMethodsFeatureKey],
);

export const selectDeliveryMethodsList = createSelector(
  selectDeliveryMethodsState,
  (state) => state.list,
);
