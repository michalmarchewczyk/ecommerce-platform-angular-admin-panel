import { SalesState } from '../reducers';
import { DeliveryMethod } from '../../../core/api';
import {
  selectDeliveriesList,
  selectDeliveriesState,
} from './deliveries.selectors';

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
      payments: {
        list: [],
      },
      deliveries: {
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
      },
    };
  });

  describe('selectDeliveriesState', () => {
    it('should select the deliveries state', () => {
      const result = selectDeliveriesState.projector(initialState);
      expect(result).toEqual(initialState.deliveries);
    });
  });

  describe('selectDeliveriesList', () => {
    it('should select the deliveries list', () => {
      const result = selectDeliveriesList.projector(initialState.deliveries);
      expect(result).toEqual(initialState.deliveries.list);
    });
  });
});
