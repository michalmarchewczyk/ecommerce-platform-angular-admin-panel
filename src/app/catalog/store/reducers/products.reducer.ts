import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../core/api';
import { ProductsActions } from '../actions';

export const productsFeatureKey = 'products';

export interface State {
  list: Product[];
  selectedProductId: number | null;
  photos: { id: number; data: Blob | null }[];
}

export const initialState: State = {
  list: [],
  selectedProductId: null,
  photos: [],
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
      list: [...state.list, { ...product, photos: [], attributes: [] }],
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
  on(
    ProductsActions.loadProductPhotosSuccess,
    (state, { photos }): State => ({
      ...state,
      photos: photos,
    }),
  ),
  on(
    ProductsActions.addProductPhotoSuccess,
    (state, { productId, data, product, photosOrder }): State => {
      const oldProduct = state.list.find((p) => p.id === productId);
      const photoId = product.photos.find(
        (p) => !oldProduct?.photos.find((ph) => ph.id === p.id),
      )?.id;
      return {
        ...state,
        photos: [...state.photos, { id: photoId ?? -1, data }],
        list: state.list.map((p) =>
          p.id === product.id
            ? { ...p, photos: product.photos, photosOrder: photosOrder }
            : p,
        ),
      };
    },
  ),
  on(
    ProductsActions.deleteProductPhotoSuccess,
    (state, { photoId, productId, photosOrder }): State => ({
      ...state,
      list: state.list.map((p) =>
        p.id === productId
          ? {
              ...p,
              photos: p.photos.filter((p) => p.id !== photoId),
              photosOrder: photosOrder,
            }
          : p,
      ),
      photos: state.photos.filter((p) => p.id !== photoId),
    }),
  ),
);
