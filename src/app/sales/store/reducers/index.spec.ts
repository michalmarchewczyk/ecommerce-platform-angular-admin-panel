import { reducers } from './index';
import * as fromOrders from './orders.reducer';
import * as fromReturns from './returns.reducer';
import * as fromPaymentMethods from './payment-methods.reducer';
import * as fromDeliveryMethods from './delivery-methods.reducer';
import * as fromStatus from './status.reducer';

describe('Sales Reducer', () => {
  it('should combine reducers', () => {
    const action = {} as any;
    const result = reducers(undefined, action);

    expect(result).toEqual({
      orders: fromOrders.initialState,
      returns: fromReturns.initialState,
      paymentMethods: fromPaymentMethods.initialState,
      deliveryMethods: fromDeliveryMethods.initialState,
      status: fromStatus.initialState,
    });
  });
});
