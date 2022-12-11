import { SalesState } from '../reducers';
import { DeliveryMethod } from '../../../core/api';
import {
  selectDeliveryMethodsList,
  selectDeliveryMethodsState,
} from './delivery-methods.selectors';

describe('Deliveries Selectors', () => {
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
        list: [
          {
            id: 1,
            name: 'test',
          } as DeliveryMethod,
        ],
      },
      status: {
        loading: false,
        error: null,
        newOrderId: 1,
      },
    };
  });

  describe('selectDeliveryMethodsState', () => {
    it('should select the deliveryMethods state', () => {
      const result = selectDeliveryMethodsState.projector(initialState);
      expect(result).toEqual(initialState.deliveryMethods);
    });
  });

  describe('selectDeliveryMethodsList', () => {
    it('should select the deliveryMethods list', () => {
      const result = selectDeliveryMethodsList.projector(
        initialState.deliveryMethods,
      );
      expect(result).toEqual(initialState.deliveryMethods.list);
    });
  });
});
