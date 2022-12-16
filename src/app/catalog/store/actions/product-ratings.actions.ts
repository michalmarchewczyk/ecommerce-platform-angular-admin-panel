import { createAction, props } from '@ngrx/store';
import { ProductRating } from '../../../core/api';

export const loadProductRatings = createAction(
  '[Product Ratings] Load Product Ratings',
  props<{ productId: number }>(),
);

export const loadProductRatingsSuccess = createAction(
  '[Product Ratings] Load Product Ratings Success',
  props<{ productId: number; productRatings: ProductRating[] }>(),
);

export const loadProductRatingsFailure = createAction(
  '[Product Ratings] Load Product Ratings Failure',
  props<{ error: string }>(),
);

export const deleteProductRating = createAction(
  '[Product Ratings] Delete Product Rating',
  props<{ productId: number; id: number }>(),
);

export const deleteProductRatingSuccess = createAction(
  '[Product Ratings] Delete Product Rating Success',
  props<{ productId: number; id: number }>(),
);

export const deleteProductRatingFailure = createAction(
  '[Product Ratings] Delete Product Rating Failure',
  props<{ error: string }>(),
);
