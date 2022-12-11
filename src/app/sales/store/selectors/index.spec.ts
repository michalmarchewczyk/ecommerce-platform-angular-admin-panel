import { SalesState } from '../reducers';
import { selectSalesState } from './index';

describe('Sales Selectors', () => {
  let initialState: SalesState;

  beforeEach(() => {
    initialState = {
      orders: {
        list: [],
        selectedOrderId: null,
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

  describe('selectSalesState', () => {
    it('should select the sales state', () => {
      const result = selectSalesState.projector(initialState);

      expect(result).toBe(initialState);
    });
  });
});
