import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '../actions';
import { Category } from '../../../core/api';

export const categoriesFeatureKey = 'categories';

export interface State {
  list: Category[];
  selectedCategoryId: number | null;
}

export const initialState: State = {
  list: [],
  selectedCategoryId: null,
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
    CategoriesActions.selectCategory,
    (state, { categoryId }): State => ({
      ...state,
      selectedCategoryId: categoryId,
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
  on(
    CategoriesActions.getCategoryProductsSuccess,
    (state, { categoryId, products }): State => ({
      ...state,
      list: state.list.map((c) =>
        c.id === categoryId ? { ...c, products } : c,
      ),
    }),
  ),
  on(
    CategoriesActions.addCategoryProductSuccess,
    (state, { categoryId, product }): State => ({
      ...state,
      list: state.list.map((c) =>
        c.id === categoryId ? { ...c, products: [...c.products, product] } : c,
      ),
    }),
  ),
  on(
    CategoriesActions.deleteCategoryProductSuccess,
    (state, { categoryId, productId }): State => ({
      ...state,
      list: state.list.map((c) =>
        c.id === categoryId
          ? { ...c, products: c.products.filter((p) => p.id !== productId) }
          : c,
      ),
    }),
  ),
);
