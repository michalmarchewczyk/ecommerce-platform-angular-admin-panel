import { createSelector } from '@ngrx/store';
import { selectCatalogState } from './index';
import * as fromAttributeTypes from '../reducers/attribute-types.reducer';

export const selectAttributeTypesState = createSelector(
  selectCatalogState,
  (state) => state[fromAttributeTypes.attributeTypesFeatureKey],
);

export const selectAttributeTypesList = createSelector(
  selectAttributeTypesState,
  (state) => state.list,
);
