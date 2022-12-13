import * as fromPages from '../reducers/pages.reducer';
import { createSelector } from '@ngrx/store';
import { selectPagesState } from './index';

export const selectPagesListState = createSelector(
  selectPagesState,
  (state) => state[fromPages.pagesFeatureKey],
);

export const selectPagesList = createSelector(
  selectPagesListState,
  (state) => state.list,
);

export const selectPagesGroups = createSelector(
  selectPagesListState,
  (state) => state.groups,
);
