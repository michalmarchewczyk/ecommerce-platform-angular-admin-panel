import { initialState, reducer } from './product-ratings.reducer';
import { ProductRating } from '../../../core/api';
import { ProductRatingsActions } from '../actions';

describe('ProductRatings Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load product ratings success action', () => {
    it('should set the list of product ratings', () => {
      const productRatings: ProductRating[] = [];
      const action = ProductRatingsActions.loadProductRatingsSuccess({
        productId: 1,
        productRatings,
      });

      const result = reducer(initialState, action);

      expect(result.ratings).toEqual({ 1: productRatings });
    });
  });

  describe('delete product rating success action', () => {
    it('should remove the product rating from the list', () => {
      const productRatings = [
        {
          id: 1,
          rating: 1,
        },
        {
          id: 2,
          rating: 2,
        },
      ] as ProductRating[];
      const action = ProductRatingsActions.deleteProductRatingSuccess({
        productId: 1,
        id: 1,
      });

      const result = reducer(
        {
          ...initialState,
          ratings: {
            1: [...productRatings],
          },
        },
        action,
      );

      expect(result.ratings).toEqual({ 1: [productRatings[1]] });
    });
  });
});
