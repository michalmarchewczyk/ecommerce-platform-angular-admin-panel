import { SalesState } from '../reducers';
import { selectPaymentsList, selectPaymentsState } from './payments.selectors';
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
      payments: {
        list: [
          {
            id: 1,
            name: 'test',
          } as PaymentMethod,
        ],
      },
      deliveries: {
        list: [],
      },
      status: {
        loading: false,
        error: null,
        newOrderId: 1,
      },
    };
  });

  describe('selectPaymentsState', () => {
    it('should select the payments state', () => {
      const result = selectPaymentsState.projector(initialState);
      expect(result).toEqual(initialState.payments);
    });
  });

  describe('selectPaymentsList', () => {
    it('should select the payments list', () => {
      const result = selectPaymentsList.projector(initialState.payments);
      expect(result).toEqual(initialState.payments.list);
    });
  });
});
