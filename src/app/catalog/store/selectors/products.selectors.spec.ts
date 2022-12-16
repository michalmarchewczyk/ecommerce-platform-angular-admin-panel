import { CatalogState } from '../reducers';
import {
  selectProductPhoto,
  selectProductPhotos,
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
        ratings: {},
      },
      status: {
        loading: false,
        error: null,
        newProductId: null,
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

  describe('selectProductPhotos', () => {
    it('should select the product photos', () => {
      const result = selectProductPhotos.projector(initialState.products);
      expect(result).toEqual(initialState.products.photos);
    });
  });

  describe('selectProductPhoto', () => {
    it('should select the product photo', () => {
      const result = selectProductPhoto(1).projector(
        initialState.products.photos,
      );
      expect(result).toEqual(initialState.products.photos[0]);
    });

    it('should return null if no photo is found', () => {
      const result = selectProductPhoto(2).projector(
        initialState.products.photos,
      );
      expect(result).toEqual(null);
    });
  });
});
