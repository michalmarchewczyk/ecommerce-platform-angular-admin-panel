import {
  selectCatalogError,
  selectCatalogLoading,
  selectCatalogNewProductId,
  selectCatalogStatusState,
} from './status.selectors';
import { CatalogState } from '../reducers';

describe('Catalog Status Selectors', () => {
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
        error: 'error',
        newProductId: 123,
      },
    };
  });

  describe('selectCatalogStatusState', () => {
    it('should select the status state', () => {
      const result = selectCatalogStatusState.projector(initialState);
      expect(result).toEqual(initialState.status);
    });
  });

  describe('selectCatalogError', () => {
    it('should select the error', () => {
      const result = selectCatalogError.projector(initialState.status);
      expect(result).toEqual(initialState.status.error);
    });
  });

  describe('selectCatalogLoading', () => {
    it('should select the loading', () => {
      const result = selectCatalogLoading.projector(initialState.status);
      expect(result).toEqual(initialState.status.loading);
    });
  });

  describe('selectCatalogNewProductId', () => {
    it('should select the newProductId', () => {
      const result = selectCatalogNewProductId.projector(initialState.status);
      expect(result).toEqual(initialState.status.newProductId);
    });
  });
});
