import { createAction, props } from '@ngrx/store';
import {
  Category,
  CategoryCreateDto,
  CategoryGroup,
  CategoryUpdateDto,
  Product,
} from '../../../core/api';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>(),
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>(),
);

export const loadCategoryGroups = createAction(
  '[Categories] Load Category Groups',
);

export const loadCategoryGroupsSuccess = createAction(
  '[Categories] Load Category Groups Success',
  props<{ categoryGroups: CategoryGroup[] }>(),
);

export const loadCategoryGroupsFailure = createAction(
  '[Categories] Load Category Groups Failure',
  props<{ error: string }>(),
);

export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ categoryId: number | null }>(),
);

export const addCategory = createAction(
  '[Categories] Add Category',
  props<{ data: CategoryCreateDto }>(),
);

export const addCategorySuccess = createAction(
  '[Categories] Add Category Success',
  props<{ category: Category }>(),
);

export const addCategoryFailure = createAction(
  '[Categories] Add Category Failure',
  props<{ error: string }>(),
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ id: number; data: CategoryUpdateDto }>(),
);

export const updateCategorySuccess = createAction(
  '[Categories] Update Category Success',
  props<{ id: number; category: Category }>(),
);

export const updateCategoryFailure = createAction(
  '[Categories] Update Category Failure',
  props<{ error: string }>(),
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ id: number }>(),
);

export const deleteCategorySuccess = createAction(
  '[Categories] Delete Category Success',
  props<{ id: number }>(),
);

export const deleteCategoryFailure = createAction(
  '[Categories] Delete Category Failure',
  props<{ error: string }>(),
);

export const getCategoryProducts = createAction(
  '[Categories] Get Category Products',
  props<{ id: number }>(),
);

export const getCategoryProductsSuccess = createAction(
  '[Categories] Get Category Products Success',
  props<{ categoryId: number; products: Product[] }>(),
);

export const getCategoryProductsFailure = createAction(
  '[Categories] Get Category Products Failure',
  props<{ error: string }>(),
);

export const addCategoryProduct = createAction(
  '[Categories] Add Category Product',
  props<{ categoryId: number; productId: number }>(),
);

export const addCategoryProductSuccess = createAction(
  '[Categories] Add Category Product Success',
  props<{ categoryId: number; product: Product }>(),
);

export const addCategoryProductFailure = createAction(
  '[Categories] Add Category Product Failure',
  props<{ error: string }>(),
);

export const deleteCategoryProduct = createAction(
  '[Categories] Delete Category Product',
  props<{ categoryId: number; productId: number }>(),
);

export const deleteCategoryProductSuccess = createAction(
  '[Categories] Delete Category Product Success',
  props<{ categoryId: number; productId: number }>(),
);

export const deleteCategoryProductFailure = createAction(
  '[Categories] Delete Category Product Failure',
  props<{ error: string }>(),
);
