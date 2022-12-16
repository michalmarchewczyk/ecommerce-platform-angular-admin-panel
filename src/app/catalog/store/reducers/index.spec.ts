import { reducers } from './index';
import * as fromProducts from './products.reducer';
import * as fromCategories from './categories.reducer';
import * as fromAttributeTypes from './attribute-types.reducer';
import * as fromProductRatings from './product-ratings.reducer';
import * as fromStatus from './status.reducer';

describe('Catalog Reducer', () => {
  it('should combine products, categories and attributeTypes reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      products: fromProducts.initialState,
      categories: fromCategories.initialState,
      attributeTypes: fromAttributeTypes.initialState,
      productRatings: fromProductRatings.initialState,
      status: fromStatus.initialState,
    });
  });
});
