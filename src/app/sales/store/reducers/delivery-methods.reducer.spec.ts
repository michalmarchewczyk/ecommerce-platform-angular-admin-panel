import { reducer, initialState } from './delivery-methods.reducer';
import { DeliveryMethod } from '../../../core/api';
import { DeliveryMethodsActions } from '../actions';

describe('DeliveryMethods Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load delivery methods success action', () => {
    it('should set the list of delivery methods', () => {
      const deliveryMethods: DeliveryMethod[] = [];
      const action = DeliveryMethodsActions.loadDeliveryMethodsSuccess({
        deliveryMethods,
      });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(deliveryMethods);
    });
  });

  describe('create delivery method success action', () => {
    it('should add the delivery method to the list', () => {
      const deliveryMethod: DeliveryMethod = {
        id: 1,
        name: 'test',
      } as DeliveryMethod;
      const action = DeliveryMethodsActions.createDeliveryMethodSuccess({
        deliveryMethod,
      });

      const result = reducer(
        {
          ...initialState,
          list: [{ id: 2, name: 'test 2' }] as DeliveryMethod[],
        },
        action,
      );

      expect(result.list).toEqual([
        { id: 2, name: 'test 2' } as DeliveryMethod,
        deliveryMethod,
      ]);
    });
  });

  describe('update delivery method success action', () => {
    it('should update the delivery method in the list', () => {
      const deliveryMethod: DeliveryMethod = {
        id: 1,
        name: 'test ',
      } as DeliveryMethod;
      const action = DeliveryMethodsActions.updateDeliveryMethodSuccess({
        methodId: 1,
        deliveryMethod: {
          ...deliveryMethod,
          name: 'test updated',
        },
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, name: 'test' },
            { id: 2, name: 'test 2' },
          ] as DeliveryMethod[],
        },
        action,
      );

      expect(result.list).toEqual([
        { ...deliveryMethod, name: 'test updated' } as DeliveryMethod,
        { id: 2, name: 'test 2' } as DeliveryMethod,
      ]);
    });
  });

  describe('delete delivery method success action', () => {
    it('should remove the delivery method from the list', () => {
      const action = DeliveryMethodsActions.deleteDeliveryMethodSuccess({
        methodId: 1,
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, name: 'test' },
            { id: 2, name: 'test 2' },
          ] as DeliveryMethod[],
        },
        action,
      );

      expect(result.list).toEqual([
        { id: 2, name: 'test 2' } as DeliveryMethod,
      ]);
    });
  });
});
