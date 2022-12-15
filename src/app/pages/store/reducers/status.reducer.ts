import { createReducer, on } from '@ngrx/store';
import { PagesActions } from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    PagesActions.loadPages,
    PagesActions.createPage,
    PagesActions.updatePage,
    PagesActions.deletePage,
    (state): State => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    PagesActions.loadPagesSuccess,
    PagesActions.createPageSuccess,
    PagesActions.updatePageSuccess,
    PagesActions.deletePageSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    PagesActions.loadPagesFailure,
    PagesActions.createPageFailure,
    PagesActions.updatePageFailure,
    PagesActions.deletePageFailure,
    (state, { error }): State => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
