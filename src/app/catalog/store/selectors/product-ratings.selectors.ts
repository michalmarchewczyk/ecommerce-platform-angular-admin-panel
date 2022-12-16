import { createSelector } from '@ngrx/store';
import { selectCatalogState } from './index';
import * as fromProductRatings from '../reducers/product-ratings.reducer';

export const selectProductRatingsState = createSelector(
  selectCatalogState,
  (state) => state[fromProductRatings.productRatingsFeatureKey],
);

export const selectProductRatings = (productId: number) =>
  createSelector(
    selectProductRatingsState,
    (state) => state.ratings[productId] ?? [],
  );
