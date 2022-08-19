import { createSelector } from '@ngrx/store';
import * as fromReturns from '../reducers/returns.reducer';
import { selectSalesState } from './index';

export const selectReturnsState = createSelector(
  selectSalesState,
  (state) => state[fromReturns.returnsFeatureKey],
);

export const selectReturnsList = createSelector(
  selectReturnsState,
  (state) => state.list,
);

export const selectSelectedReturnId = createSelector(
  selectReturnsState,
  (state) => state.selectedReturnId,
);

export const selectSelectedReturn = createSelector(
  selectReturnsState,
  selectSelectedReturnId,
  (state, selectedReturnId) => {
    return selectedReturnId
      ? state.list.find((r) => r.id === selectedReturnId)
      : null;
  },
);
