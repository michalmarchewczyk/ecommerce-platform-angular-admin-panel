import { reducer, initialState } from './orders.reducer';
import { Order } from '../../../core/api';
import { OrdersActions } from '../actions';

describe('Orders Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load orders success action', () => {
    it('should set the list of orders', () => {
      const orders: Order[] = [];
      const action = OrdersActions.loadOrdersSuccess({ orders });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(orders);
    });
  });

  describe('get order success action', () => {
    it('should update the order in the list', () => {
      const order = { id: 1, status: 'pending', items: [] } as any;
      const action = OrdersActions.getOrderSuccess({ order });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, status: 'pending' },
            { id: 2, status: 'failed' },
          ] as Order[],
        },
        action,
      );

      expect(result.list).toEqual([order, { id: 2, status: 'failed' }]);
    });
  });

  describe('select order action', () => {
    it('should set the selected order id', () => {
      const orderId = 1;
      const action = OrdersActions.selectOrder({ orderId });

      const result = reducer(initialState, action);

      expect(result.selectedOrderId).toEqual(orderId);
    });
  });

  describe('create order success action', () => {
    it('should add the order to the list', () => {
      const order: Order = { id: 1, status: 'pending' } as Order;
      const action = OrdersActions.createOrderSuccess({ order });

      const result = reducer(initialState, action);

      expect(result.list).toEqual([order]);
    });
  });

  describe('update order success action', () => {
    it('should update the order in the list', () => {
      const order: Order = { id: 1, status: 'pending' } as Order;
      const action = OrdersActions.updateOrderSuccess({
        orderId: 1,
        order: {
          ...order,
          status: 'confirmed',
        },
      });

      const result = reducer(
        { ...initialState, list: [order, { ...order, id: 2 }] },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          {
            ...order,
            status: 'confirmed',
          },
          { ...order, id: 2 },
        ],
      });
    });
  });
});
