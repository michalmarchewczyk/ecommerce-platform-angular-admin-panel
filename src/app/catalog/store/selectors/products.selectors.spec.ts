import { CatalogState } from '../reducers';
import {
  selectProductsList,
  selectProductsState,
  selectSelectedProduct,
  selectSelectedProductId,
} from './products.selectors';
import { Product } from '../../../core/api';

describe('Products Selectors', () => {
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
      },
      categories: {
        list: [],
      },
      attributes: {
        list: [],
      },
    };
  });

  describe('selectProductsState', () => {
    it('should select the products state', () => {
      const result = selectProductsState.projector(initialState);
      expect(result).toEqual(initialState.products);
    });
  });

  describe('selectProductsList', () => {
    it('should select the products list', () => {
      const result = selectProductsList.projector(initialState.products);
      expect(result).toEqual(initialState.products.list);
    });
  });

  describe('selectSelectedProductId', () => {
    it('should select the selected product id', () => {
      const result = selectSelectedProductId.projector(initialState.products);
      expect(result).toEqual(initialState.products.selectedProductId);
    });
  });

  describe('selectSelectedProduct', () => {
    it('should select the selected product', () => {
      const result = selectSelectedProduct.projector(
        initialState.products,
        initialState.products.selectedProductId,
      );
      expect(result).toEqual(initialState.products.list[0]);
    });

    it('should return null if no product is selected', () => {
      const result = selectSelectedProduct.projector(
        initialState.products,
        null,
      );
      expect(result).toEqual(null);
    });
  });
});
