import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../core/api';
import { ProductsActions } from '../actions';

export const productsFeatureKey = 'products';

export interface State {
  list: Product[];
  selectedProductId: number | null;
}

export const initialState: State = {
  list: [],
  selectedProductId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    ProductsActions.loadProductsSuccess,
    (state, { products }): State => ({
      ...state,
      list: products,
    }),
  ),
  on(
    ProductsActions.selectProduct,
    (state, { productId }): State => ({
      ...state,
      selectedProductId: productId,
    }),
  ),
  on(
    ProductsActions.addProductSuccess,
    (state, { product }): State => ({
      ...state,
      list: [...state.list, product],
    }),
  ),
  on(
    ProductsActions.updateProductSuccess,
    (state, { id, product }): State => ({
      ...state,
      list: state.list.map((p) => (p.id === id ? product : p)),
    }),
  ),
  on(
    ProductsActions.deleteProductSuccess,
    (state, { id }): State => ({
      ...state,
      list: state.list.filter((p) => p.id !== id),
    }),
  ),
  on(
    ProductsActions.updateProductAttributesSuccess,
    (state, { id, attributes }): State => ({
      ...state,
      list: state.list.map((p) => (p.id === id ? { ...p, attributes } : p)),
    }),
  ),
);
