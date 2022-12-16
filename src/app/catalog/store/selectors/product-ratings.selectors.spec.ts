import { CatalogState } from '../reducers';
import { Product } from '../../../core/api';
import {
  selectProductRatings,
  selectProductRatingsState,
} from './product-ratings.selectors';

describe('ProductRatings Selectors', () => {
  let initialState: CatalogState;

  beforeEach(() => {
    initialState = {
      products: {
        list: [
          {
            id: 1,
            name: 'Product 1',
          } as Product,
        ],
        selectedProductId: 1,
        photos: [
          {
            id: 1,
            data: {} as Blob,
          },
        ],
      },
      categories: {
        list: [],
        groups: [],
        selectedCategoryId: null,
      },
      attributeTypes: {
        list: [],
      },
      productRatings: {
        ratings: {
          1: [
            {
              id: 1,
              productId: 1,
              rating: 5,
            } as any,
          ],
        },
      },
      status: {
        loading: false,
        error: null,
        newProductId: null,
      },
    };
  });

  describe('selectProductRatingsState', () => {
    it('should select the productRatings state', () => {
      const result = selectProductRatingsState.projector(initialState);
      expect(result).toEqual(initialState.productRatings);
    });
  });

  describe('selectProductRatings', () => {
    it('should select the product ratings', () => {
      const result = selectProductRatings(1).projector(
        initialState.productRatings,
      );
      expect(result).toEqual(initialState.productRatings.ratings[1]);
    });
  });
});
