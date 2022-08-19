import { SalesState } from '../reducers';
import { Order } from '../../../core/api';
import {
  selectOrdersList,
  selectOrdersState,
  selectSelectedOrder,
  selectSelectedOrderId,
} from './orders.selectors';

describe('Orders Selectors', () => {
  let initialState: SalesState;

  beforeEach(() => {
    initialState = {
      orders: {
        list: [
          {
            id: 1,
            status: 'pending',
            fullName: 'test',
          } as Order,
        ],
        selectedOrderId: 1,
      },
      returns: {
        list: [],
        selectedReturnId: null,
      },
      payments: {
        list: [],
      },
      deliveries: {
        list: [],
      },
      status: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectOrdersState', () => {
    it('should select the orders state', () => {
      const result = selectOrdersState.projector(initialState);
      expect(result).toEqual(initialState.orders);
    });
  });

  describe('selectOrdersList', () => {
    it('should select the orders list', () => {
      const result = selectOrdersList.projector(initialState.orders);
      expect(result).toEqual(initialState.orders.list);
    });
  });

  describe('selectSelectedOrderId', () => {
    it('should select the selected order id', () => {
      const result = selectSelectedOrderId.projector(initialState.orders);
      expect(result).toEqual(1);
    });
  });

  describe('selectSelectedOrder', () => {
    it('should select the selected order', () => {
      const result = selectSelectedOrder.projector(
        initialState.orders,
        initialState.orders.selectedOrderId,
      );
      expect(result).toEqual(initialState.orders.list[0]);
    });

    it('should return null if no order is selected', () => {
      const result = selectSelectedOrder.projector(initialState.orders, null);
      expect(result).toEqual(null);
    });
  });
});
