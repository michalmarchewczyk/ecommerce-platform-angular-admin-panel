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

export const selectReturnsListWithItems = createSelector(
  selectReturnsList,
  (returns) =>
    returns.map((r) => ({
      ...r,
      itemsCount: r.order.items.reduce((acc, item) => acc + item.quantity, 0),
      itemsTotal: r.order.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
    })),
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
