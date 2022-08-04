import { reducer, initialState } from './products.reducer';
import { Attribute, Product } from '../../../core/api';
import { ProductsActions } from '../actions';

describe('Products Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load products success action', () => {
    it('should set the list of products', () => {
      const products: Product[] = [];
      const action = ProductsActions.loadProductsSuccess({ products });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(products);
    });
  });

  describe('select product action', () => {
    it('should set the selected product id', () => {
      const productId = 1;
      const action = ProductsActions.selectProduct({ productId });

      const result = reducer(initialState, action);

      expect(result.selectedProductId).toEqual(productId);
    });
  });

  describe('add product success action', () => {
    it('should add the product to the list', () => {
      const product: Product = { id: 1, name: 'Product 1' } as Product;
      const action = ProductsActions.addProductSuccess({ product });

      const result = reducer(initialState, action);

      expect(result.list).toEqual([product]);
    });
  });

  describe('update product success action', () => {
    it('should update the product in the list', () => {
      const product: Product = { id: 1, name: 'Product 1' } as Product;
      const action = ProductsActions.updateProductSuccess({
        id: 1,
        product: {
          ...product,
          name: 'Product 1 updated',
        },
      });

      const result = reducer(
        { ...initialState, list: [product, { ...product, id: 2 }] },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          {
            ...product,
            name: 'Product 1 updated',
          },
          { ...product, id: 2 },
        ],
      });
    });
  });

  describe('delete product success action', () => {
    it('should delete the product from the list', () => {
      const product: Product = { id: 1, name: 'Product 1' } as Product;
      const action = ProductsActions.deleteProductSuccess({ id: 1 });

      const result = reducer({ ...initialState, list: [product] }, action);

      expect(result.list).toEqual([]);
    });
  });

  describe('update product attributes success action', () => {
    it('should update the product attributes in the list', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      const attribute = { value: 'Value 1', type: {} as any } as Attribute;
      const action = ProductsActions.updateProductAttributesSuccess({
        id: 1,
        attributes: [attribute],
      });

      const result = reducer(
        { ...initialState, list: [product, { ...product, id: 2 }] },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          { ...product, attributes: [attribute] },
          { ...product, id: 2 },
        ],
      });
    });
  });
});
