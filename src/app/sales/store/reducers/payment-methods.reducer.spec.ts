import { reducer, initialState } from './payment-methods.reducer';
import { PaymentMethod } from '../../../core/api';
import { PaymentMethodsActions } from '../actions';

describe('PaymentMethods Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load payment methods success action', () => {
    it('should set the list of payment methods', () => {
      const paymentMethods: PaymentMethod[] = [];
      const action = PaymentMethodsActions.loadPaymentMethodsSuccess({
        paymentMethods,
      });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(paymentMethods);
    });
  });

  describe('create payment method success action', () => {
    it('should add the payment method to the list', () => {
      const paymentMethod: PaymentMethod = {
        id: 1,
        name: 'test',
      } as PaymentMethod;
      const action = PaymentMethodsActions.createPaymentMethodSuccess({
        paymentMethod,
      });

      const result = reducer(
        {
          ...initialState,
          list: [{ id: 2, name: 'test 2' }] as PaymentMethod[],
        },
        action,
      );

      expect(result.list).toEqual([
        { id: 2, name: 'test 2' } as PaymentMethod,
        paymentMethod,
      ]);
    });
  });

  describe('update payment method success action', () => {
    it('should update the payment method in the list', () => {
      const paymentMethod: PaymentMethod = {
        id: 1,
        name: 'test ',
      } as PaymentMethod;
      const action = PaymentMethodsActions.updatePaymentMethodSuccess({
        methodId: 1,
        paymentMethod: {
          ...paymentMethod,
          name: 'test updated',
        },
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, name: 'test' },
            { id: 2, name: 'test 2' },
          ] as PaymentMethod[],
        },
        action,
      );

      expect(result.list).toEqual([
        { ...paymentMethod, name: 'test updated' } as PaymentMethod,
        { id: 2, name: 'test 2' } as PaymentMethod,
      ]);
    });
  });

  describe('delete payment method success action', () => {
    it('should remove the payment method from the list', () => {
      const action = PaymentMethodsActions.deletePaymentMethodSuccess({
        methodId: 1,
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, name: 'test' },
            { id: 2, name: 'test 2' },
          ] as PaymentMethod[],
        },
        action,
      );

      expect(result.list).toEqual([{ id: 2, name: 'test 2' } as PaymentMethod]);
    });
  });
});
