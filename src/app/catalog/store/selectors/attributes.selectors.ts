import { createSelector } from '@ngrx/store';
import { selectCatalogState } from './index';
import * as fromAttributes from '../reducers/attributes.reducer';

export const selectAttributesState = createSelector(
  selectCatalogState,
  (state) => state[fromAttributes.attributesFeatureKey],
);

export const selectAttributeTypesList = createSelector(
  selectAttributesState,
  (state) => state.list,
);
