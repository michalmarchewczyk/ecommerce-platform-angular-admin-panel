import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '../actions';
import { Category } from '../../../core/api';

export const categoriesFeatureKey = 'categories';

export interface State {
  list: Category[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    CategoriesActions.loadCategoriesSuccess,
    (state, { categories }): State => ({
      ...state,
      list: categories,
    }),
  ),
  on(
    CategoriesActions.addCategorySuccess,
    (state, { category }): State => ({
      ...state,
      list: [...state.list, category],
    }),
  ),
  on(
    CategoriesActions.updateCategorySuccess,
    (state, { id, category }): State => ({
      ...state,
      list: state.list.map((c) => (c.id === id ? category : c)),
    }),
  ),
  on(
    CategoriesActions.deleteCategorySuccess,
    (state, { id }): State => ({
      ...state,
      list: state.list.filter((c) => c.id !== id),
    }),
  ),
);
