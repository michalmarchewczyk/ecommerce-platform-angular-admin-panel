import { reducer, initialState } from './status.reducer';
import { PagesActions } from '../actions';

describe('Pages Status Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('api action', () => {
    it('should set loading to true', () => {
      const action = PagesActions.loadPages();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: true,
        error: null,
      });
    });
  });

  describe('success action', () => {
    it('should set loading to false', () => {
      const action = PagesActions.createPageSuccess({
        page: {} as any,
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe('failure action', () => {
    it('should set loading to false and set the error', () => {
      const action = PagesActions.createPageFailure({
        error: 'error',
      });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        loading: false,
        error: 'error',
      });
    });
  });
});
