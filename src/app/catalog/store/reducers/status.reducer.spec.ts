import { reducer, initialState } from './status.reducer';
import { ProductsActions } from '../actions';

describe('Status Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('api action', () => {
    it('should set loading to true', () => {
      const action = ProductsActions.updateProduct({ id: 0, data: {} as any });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
        newProductId: null,
      });
    });
  });

  describe('success action', () => {
    it('should set loading to false', () => {
      const action = ProductsActions.updateProductSuccess({
        id: 0,
        product: {} as any,
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
        newProductId: null,
      });
    });
  });

  describe('failure action', () => {
    it('should set loading to false and set the error', () => {
      const action = ProductsActions.updateProductFailure({
        error: 'error',
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
        newProductId: null,
      });
    });
  });

  describe('add product success action', () => {
    it('should set loading to false and set the new product id', () => {
      const action = ProductsActions.addProductSuccess({
        product: { id: 123 } as any,
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
        newProductId: 123,
      });
    });
  });
});
