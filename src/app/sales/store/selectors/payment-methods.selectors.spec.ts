import { SalesState } from '../reducers';
import {
  selectPaymentMethodsList,
  selectPaymentMethodsState,
} from './payment-methods.selectors';
import { PaymentMethod } from '../../../core/api';

describe('Payments Selectors', () => {
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
        list: [
          {
            id: 1,
            name: 'test',
          } as PaymentMethod,
        ],
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

  describe('selectPaymentMethodsState', () => {
    it('should select the paymentMethods state', () => {
      const result = selectPaymentMethodsState.projector(initialState);
      expect(result).toEqual(initialState.paymentMethods);
    });
  });

  describe('selectPaymentMethodsList', () => {
    it('should select the paymentMethods list', () => {
      const result = selectPaymentMethodsList.projector(
        initialState.paymentMethods,
      );
      expect(result).toEqual(initialState.paymentMethods.list);
    });
  });
});
