import { reducer, initialState } from './status.reducer';
import { OrdersActions } from '../actions';

describe('Sales Status Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('api action', () => {
    it('should set loading to true', () => {
      const action = OrdersActions.updateOrder({ orderId: 0, data: {} as any });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('success action', () => {
    it('should set loading to false', () => {
      const action = OrdersActions.updateOrderSuccess({
        orderId: 0,
        order: {} as any,
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('failure action', () => {
    it('should set loading to false and set the error', () => {
      const action = OrdersActions.updateOrderFailure({
        error: 'error',
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });

  describe('create order success action', () => {
    it('should set the new order id', () => {
      const action = OrdersActions.createOrderSuccess({
        order: { id: 1 } as any,
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
        newOrderId: 1,
      });
    });
  });
});
