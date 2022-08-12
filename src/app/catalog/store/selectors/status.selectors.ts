import { createSelector } from '@ngrx/store';
import * as fromStatus from '../reducers/status.reducer';
import { selectCatalogState } from './index';

export const selectCatalogStatusState = createSelector(
  selectCatalogState,
  (state) => state[fromStatus.statusFeatureKey],
);

export const selectCatalogError = createSelector(
  selectCatalogStatusState,
  (state) => state.error,
);

export const selectCatalogLoading = createSelector(
  selectCatalogStatusState,
  (state) => state.loading,
);

export const selectCatalogNewProductId = createSelector(
  selectCatalogStatusState,
  (state) => state.newProductId,
);
