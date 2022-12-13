import { createReducer, on } from '@ngrx/store';
import { Page } from '../../../core/api';
import { PagesActions } from '../actions';

export const pagesFeatureKey = 'pages';

export interface State {
  list: Page[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    PagesActions.loadPagesSuccess,
    (state, { pages }): State => ({
      ...state,
      list: pages,
    }),
  ),
  on(
    PagesActions.createPageSuccess,
    (state, { page }): State => ({
      ...state,
      list: [...state.list, page],
    }),
  ),
  on(
    PagesActions.updatePageSuccess,
    (state, { page }): State => ({
      ...state,
      list: state.list.map((s) => (s.id === page.id ? page : s)),
    }),
  ),
  on(
    PagesActions.deletePageSuccess,
    (state, { pageId }): State => ({
      ...state,
      list: state.list.filter((s) => s.id !== pageId),
    }),
  ),
);
