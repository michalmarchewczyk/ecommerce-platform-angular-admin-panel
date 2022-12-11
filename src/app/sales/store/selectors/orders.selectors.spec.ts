import { SalesState } from '../reducers';
import {
  selectOrdersList,
  selectOrdersListWithItems,
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
            items: [
              {
                id: 1,
                price: 2,
                quantity: 2,
              },
            ],
          } as any,
        ],
        selectedOrderId: 1,
      },
      returns: {
        list: [],
        selectedReturnId: null,
      },
      paymentMethods: {
        list: [],
      },
      deliveryMethods: {
        list: [],
      },
      status: {
        loading: false,
        error: null,
        newOrderId: 1,
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

  describe('selectOrdersListWithItems', () => {
    it('should select the orders list with items data', () => {
      const result = selectOrdersListWithItems.projector(
        initialState.orders.list,
      );
      expect(result).toEqual([
        {
          ...initialState.orders.list[0],
          itemsCount: 2,
          itemsTotal: 4,
        },
      ]);
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
