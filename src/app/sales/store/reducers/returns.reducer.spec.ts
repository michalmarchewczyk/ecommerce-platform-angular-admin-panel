import { reducer, initialState } from './returns.reducer';
import { Return } from '../../../core/api';
import { ReturnsActions } from '../actions';

describe('Returns Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load returns success action', () => {
    it('should set the list of returns', () => {
      const returns: Return[] = [];
      const action = ReturnsActions.loadReturnsSuccess({ returns });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(returns);
    });
  });

  describe('get return success action', () => {
    it('should update the return in the list', () => {
      const data = { id: 1, status: 'pending', items: [] } as any;
      const action = ReturnsActions.getReturnSuccess({ return: data });

      const result = reducer(
        {
          ...initialState,
          list: [
            { id: 1, status: 'open' },
            { id: 2, status: 'accepted' },
          ] as Return[],
        },
        action,
      );

      expect(result.list).toEqual([data, { id: 2, status: 'accepted' }]);
    });
  });

  describe('select return action', () => {
    it('should set the selected return id', () => {
      const returnId = 1;
      const action = ReturnsActions.selectReturn({ returnId });

      const result = reducer(initialState, action);

      expect(result.selectedReturnId).toEqual(returnId);
    });
  });

  describe('create return success action', () => {
    it('should add the return to the list', () => {
      const data: Return = { id: 1, status: 'open' } as Return;
      const action = ReturnsActions.createReturnSuccess({ return: data });

      const result = reducer(initialState, action);

      expect(result.list).toEqual([data]);
    });
  });

  describe('update return success action', () => {
    it('should update the return in the list', () => {
      const data: Return = { id: 1, status: 'open' } as Return;
      const action = ReturnsActions.updateReturnSuccess({
        returnId: 1,
        return: {
          ...data,
          status: 'completed',
        },
      });

      const result = reducer(
        { ...initialState, list: [data, { ...data, id: 2 }] },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          {
            ...data,
            status: 'completed',
          },
          { ...data, id: 2 },
        ],
      });
    });
  });
});
