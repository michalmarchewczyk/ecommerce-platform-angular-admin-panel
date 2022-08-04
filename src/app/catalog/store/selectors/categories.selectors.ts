import { createSelector } from '@ngrx/store';
import { selectCatalogState } from './index';
import * as fromCategories from '../reducers/categories.reducer';

export const selectCategoriesState = createSelector(
  selectCatalogState,
  (state) => state[fromCategories.categoriesFeatureKey],
);

export const selectCategoriesList = createSelector(
  selectCategoriesState,
  (state) => state.list,
);
