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

export const selectCategoriesGroups = createSelector(
  selectCategoriesState,
  (state) => state.groups,
);

export const selectSelectedCategoryId = createSelector(
  selectCategoriesState,
  (state) => state.selectedCategoryId,
);

export const selectSelectedCategory = createSelector(
  selectCategoriesList,
  selectSelectedCategoryId,
  (categories, selectedCategoryId) =>
    categories.find((c) => c.id === selectedCategoryId) ?? null,
);
