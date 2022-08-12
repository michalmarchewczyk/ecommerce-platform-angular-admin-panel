import { createReducer, on } from '@ngrx/store';
import {
  AttributesActions,
  CategoriesActions,
  ProductsActions,
} from '../actions';

export const statusFeatureKey = 'status';

export interface State {
  error: string | null;
  loading: boolean;
  newProductId: number | null;
}

export const initialState: State = {
  error: null,
  loading: false,
  newProductId: null,
};

export const reducer = createReducer(
  initialState,
  on(
    ProductsActions.addProduct,
    ProductsActions.updateProduct,
    ProductsActions.deleteProduct,
    ProductsActions.updateProductAttributes,
    ProductsActions.addProductPhoto,
    ProductsActions.deleteProductPhoto,
    AttributesActions.addAttributeType,
    AttributesActions.updateAttributeType,
    AttributesActions.deleteAttributeType,
    CategoriesActions.addCategory,
    CategoriesActions.updateCategory,
    CategoriesActions.deleteCategory,
    CategoriesActions.addCategoryProduct,
    CategoriesActions.deleteCategoryProduct,
    (state): State => ({
      ...state,
      loading: true,
      error: null,
      newProductId: null,
    }),
  ),
  on(
    ProductsActions.updateProductSuccess,
    ProductsActions.deleteProductSuccess,
    ProductsActions.updateProductAttributesSuccess,
    ProductsActions.addProductPhotoSuccess,
    ProductsActions.deleteProductPhotoSuccess,
    AttributesActions.addAttributeTypeSuccess,
    AttributesActions.updateAttributeTypeSuccess,
    AttributesActions.deleteAttributeTypeSuccess,
    CategoriesActions.addCategorySuccess,
    CategoriesActions.updateCategorySuccess,
    CategoriesActions.deleteCategorySuccess,
    CategoriesActions.addCategoryProductSuccess,
    CategoriesActions.deleteCategoryProductSuccess,
    (state): State => ({
      ...state,
      loading: false,
      error: null,
      newProductId: null,
    }),
  ),
  on(
    ProductsActions.addProductFailure,
    ProductsActions.updateProductFailure,
    ProductsActions.deleteProductFailure,
    ProductsActions.updateProductAttributesFailure,
    ProductsActions.addProductPhotoFailure,
    ProductsActions.deleteProductPhotoFailure,
    AttributesActions.addAttributeTypeFailure,
    AttributesActions.updateAttributeTypeFailure,
    AttributesActions.deleteAttributeTypeFailure,
    CategoriesActions.addCategoryFailure,
    CategoriesActions.updateCategoryFailure,
    CategoriesActions.deleteCategoryFailure,
    CategoriesActions.addCategoryProductFailure,
    CategoriesActions.deleteCategoryProductFailure,
    (state, action): State => ({
      ...state,
      loading: false,
      error: action.error,
      newProductId: null,
    }),
  ),
  on(
    ProductsActions.addProductSuccess,
    (state, action): State => ({
      ...state,
      loading: false,
      error: null,
      newProductId: action.product.id,
    }),
  ),
);
