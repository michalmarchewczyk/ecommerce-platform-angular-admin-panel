import { SalesState } from '../reducers';
import {
  selectNewOrderId,
  selectSalesError,
  selectSalesLoading,
  selectSalesStatusState,
} from './status.selectors';

describe('Sales Status Selectors', () => {
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
        error: 'error',
        newOrderId: 1,
      },
    };
  });

  describe('selectSalesStatusState', () => {
    it('should select the sales status state', () => {
      const result = selectSalesStatusState.projector(initialState);

      expect(result).toBe(initialState.status);
    });
  });

  describe('selectSalesError', () => {
    it('should select the sales error', () => {
      const result = selectSalesError.projector(initialState.status);

      expect(result).toBe(initialState.status.error);
    });
  });

  describe('selectSalesLoading', () => {
    it('should select the sales loading', () => {
      const result = selectSalesLoading.projector(initialState.status);

      expect(result).toBe(initialState.status.loading);
    });
  });

  describe('selectNewOrderId', () => {
    it('should select the new order id', () => {
      const result = selectNewOrderId.projector(initialState.status);

      expect(result).toBe(initialState.status.newOrderId);
    });
  });
});
