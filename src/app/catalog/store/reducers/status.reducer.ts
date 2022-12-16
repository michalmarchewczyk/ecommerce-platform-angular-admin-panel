import { createReducer, on } from '@ngrx/store';
import {
  AttributeTypesActions,
  CategoriesActions,
  ProductRatingsActions,
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
    AttributeTypesActions.addAttributeType,
    AttributeTypesActions.updateAttributeType,
    AttributeTypesActions.deleteAttributeType,
    CategoriesActions.addCategory,
    CategoriesActions.updateCategory,
    CategoriesActions.deleteCategory,
    CategoriesActions.addCategoryProduct,
    CategoriesActions.deleteCategoryProduct,
    ProductRatingsActions.loadProductRatings,
    ProductRatingsActions.deleteProductRating,
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
    AttributeTypesActions.addAttributeTypeSuccess,
    AttributeTypesActions.updateAttributeTypeSuccess,
    AttributeTypesActions.deleteAttributeTypeSuccess,
    CategoriesActions.addCategorySuccess,
    CategoriesActions.updateCategorySuccess,
    CategoriesActions.deleteCategorySuccess,
    CategoriesActions.addCategoryProductSuccess,
    CategoriesActions.deleteCategoryProductSuccess,
    ProductRatingsActions.loadProductRatingsSuccess,
    ProductRatingsActions.deleteProductRatingSuccess,
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
    AttributeTypesActions.addAttributeTypeFailure,
    AttributeTypesActions.updateAttributeTypeFailure,
    AttributeTypesActions.deleteAttributeTypeFailure,
    CategoriesActions.addCategoryFailure,
    CategoriesActions.updateCategoryFailure,
    CategoriesActions.deleteCategoryFailure,
    CategoriesActions.addCategoryProductFailure,
    CategoriesActions.deleteCategoryProductFailure,
    ProductRatingsActions.loadProductRatingsFailure,
    ProductRatingsActions.deleteProductRatingFailure,
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
