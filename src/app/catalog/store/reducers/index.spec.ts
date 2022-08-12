import { reducers } from './index';
import * as fromProducts from './products.reducer';
import * as fromCategories from './categories.reducer';
import * as fromAttributes from './attributes.reducer';
import * as fromStatus from './status.reducer';

describe('Catalog Reducer', () => {
  it('should combine products, categories and attributes reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      products: fromProducts.initialState,
      categories: fromCategories.initialState,
      attributes: fromAttributes.initialState,
      status: fromStatus.initialState,
    });
  });
});
