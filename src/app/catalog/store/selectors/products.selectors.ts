import { createSelector } from '@ngrx/store';
import { selectCatalogState } from './index';
import * as fromProducts from '../reducers/products.reducer';

export const selectProductsState = createSelector(
  selectCatalogState,
  (state) => state[fromProducts.productsFeatureKey],
);

export const selectProductsList = createSelector(
  selectProductsState,
  (state) => state.list,
);
export const selectSelectedProductId = createSelector(
  selectProductsState,
  (state) => state.selectedProductId,
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  selectSelectedProductId,
  (state, selectedProductId) =>
    selectedProductId
      ? state.list.find((p) => p.id === selectedProductId)
      : null,
);

export const selectProductPhotos = createSelector(
  selectProductsState,
  (state) => state.photos,
);

export const selectProductPhoto = (photoId: number) =>
  createSelector(
    selectProductPhotos,
    (state) => state.find((p) => p.id === photoId) ?? null,
  );
