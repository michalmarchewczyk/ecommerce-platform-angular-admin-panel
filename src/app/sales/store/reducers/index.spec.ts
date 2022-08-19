import { reducers } from './index';
import * as fromOrders from './orders.reducer';
import * as fromReturns from './returns.reducer';
import * as fromPayments from './payments.reducer';
import * as fromDeliveries from './deliveries.reducer';
import * as fromStatus from './status.reducer';

describe('Sales Reducer', () => {
  it('should combine reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      orders: fromOrders.initialState,
      returns: fromReturns.initialState,
      payments: fromPayments.initialState,
      deliveries: fromDeliveries.initialState,
      status: fromStatus.initialState,
    });
  });
});
