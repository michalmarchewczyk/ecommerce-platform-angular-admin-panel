import { createReducer, on } from '@ngrx/store';
import { Return } from '../../../core/api';
import { ReturnsActions } from '../actions';

export const returnsFeatureKey = 'returns';

export interface State {
  list: Return[];
  selectedReturnId: number | null;
}

export const initialState: State = {
  list: [],
  selectedReturnId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    ReturnsActions.loadReturnsSuccess,
    (state, { returns }): State => ({
      ...state,
      list: returns,
    }),
  ),
  on(
    ReturnsActions.selectReturn,
    (state, { returnId }): State => ({
      ...state,
      selectedReturnId: returnId,
    }),
  ),
  on(
    ReturnsActions.getReturnSuccess,
    (state, action): State => ({
      ...state,
      list: state.list.map((r) =>
        r.id === action.return.id ? action.return : r,
      ),
    }),
  ),
  on(
    ReturnsActions.createReturnSuccess,
    (state, action): State => ({
      ...state,
      list: [...state.list, action.return],
    }),
  ),
  on(
    ReturnsActions.updateReturnSuccess,
    (state, action): State => ({
      ...state,
      list: state.list.map((r) =>
        r.id === action.returnId ? { ...r, ...action.return } : r,
      ),
    }),
  ),
);
