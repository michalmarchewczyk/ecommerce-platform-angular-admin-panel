import { Product, ProductRating } from '../../../core/api';
import { createReducer, on } from '@ngrx/store';
import { ProductRatingsActions } from '../actions';

export const productRatingsFeatureKey = 'productRatings';

export interface State {
  ratings: Record<Product['id'], ProductRating[]>;
}

export const initialState: State = {
  ratings: {},
};

export const reducer = createReducer(
  initialState,
  on(
    ProductRatingsActions.loadProductRatingsSuccess,
    (state, { productId, productRatings }): State => ({
      ...state,
      ratings: {
        ...state.ratings,
        [productId]: productRatings,
      },
    }),
  ),
  on(
    ProductRatingsActions.deleteProductRatingSuccess,
    (state, { productId, id }): State => ({
      ...state,
      ratings: {
        ...state.ratings,
        [productId]: state.ratings[productId].filter((r) => r.id !== id),
      },
    }),
  ),
);
