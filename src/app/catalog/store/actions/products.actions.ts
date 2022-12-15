import { createAction, props } from '@ngrx/store';
import {
  Attribute,
  AttributeDto,
  Product,
  ProductCreateDto,
  ProductUpdateDto,
} from '../../../core/api';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>(),
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>(),
);

export const selectProduct = createAction(
  '[Products] Select Product',
  props<{ productId: number | null }>(),
);

export const addProduct = createAction(
  '[Products] Add Product',
  props<{ data: ProductCreateDto }>(),
);

export const addProductSuccess = createAction(
  '[Products] Add Product Success',
  props<{ product: Product }>(),
);

export const addProductFailure = createAction(
  '[Products] Add Product Failure',
  props<{ error: string }>(),
);

export const updateProduct = createAction(
  '[Products] Update Product',
  props<{ id: number; data: ProductUpdateDto }>(),
);

export const updateProductSuccess = createAction(
  '[Products] Update Product Success',
  props<{ id: number; product: Product }>(),
);

export const updateProductFailure = createAction(
  '[Products] Update Product Failure',
  props<{ error: string }>(),
);

export const deleteProduct = createAction(
  '[Products] Delete Product',
  props<{ id: number }>(),
);

export const deleteProductSuccess = createAction(
  '[Products] Delete Product Success',
  props<{ id: number }>(),
);

export const deleteProductFailure = createAction(
  '[Products] Delete Product Failure',
  props<{ error: string }>(),
);

export const updateProductAttributes = createAction(
  '[Products] Update Product Attributes',
  props<{ id: number; data: AttributeDto[] }>(),
);

export const updateProductAttributesSuccess = createAction(
  '[Products] Update Product Attributes Success',
  props<{ id: number; attributes: Attribute[] }>(),
);

export const updateProductAttributesFailure = createAction(
  '[Products] Update Product Attributes Failure',
  props<{ error: string }>(),
);

export const loadProductPhotosSuccess = createAction(
  '[Products] Load Product Photos Success',
  props<{ photos: { id: number; data: Blob | null }[] }>(),
);

export const addProductPhoto = createAction(
  '[Products] Add Product Photo',
  props<{ productId: number; data: Blob }>(),
);

export const addProductPhotoSuccess = createAction(
  '[Products] Add Product Photo Success',
  props<{
    productId: number;
    data: Blob;
    product: Product;
    photosOrder?: string;
  }>(),
);

export const addProductPhotoFailure = createAction(
  '[Products] Add Product Photo Failure',
  props<{ error: string }>(),
);

export const deleteProductPhoto = createAction(
  '[Products] Delete Product Photo',
  props<{ productId: number; photoId: number }>(),
);

export const deleteProductPhotoSuccess = createAction(
  '[Products] Delete Product Photo Success',
  props<{ productId: number; photoId: number; photosOrder?: string }>(),
);

export const deleteProductPhotoFailure = createAction(
  '[Products] Delete Product Photo Failure',
  props<{ error: string }>(),
);
