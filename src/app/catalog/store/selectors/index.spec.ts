import { CatalogState } from '../reducers';
import { selectCatalogState } from './index';

describe('Catalog Selectors', () => {
  let initialState: CatalogState;

  beforeEach(() => {
    initialState = {
      products: {
        list: [],
        selectedProductId: null,
        photos: [],
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
        ratings: {},
      },
      status: {
        loading: false,
        error: null,
        newProductId: null,
      },
    };
  });

  describe('selectCatalogState', () => {
    it('should select the catalog state', () => {
      const result = selectCatalogState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });
});
