import { PagesState } from '../reducers';
import {
  selectPagesError,
  selectPagesLoading,
  selectPagesStatusState,
} from './status.selectors';

describe('Pages Status Selectors', () => {
  let initialState: PagesState;

  beforeEach(() => {
    initialState = {
      pages: {
        list: [],
        groups: [],
      },
      status: {
        loading: false,
        error: 'error',
      },
    };
  });

  describe('selectPagesStatusState', () => {
    it('should return the pages status state', () => {
      const result = selectPagesStatusState.projector(initialState);

      expect(result).toEqual(initialState.status);
    });
  });

  describe('selectPagesError', () => {
    it('should return the pages error', () => {
      const result = selectPagesError.projector(initialState.status);

      expect(result).toEqual(initialState.status.error);
    });
  });

  describe('selectPagesLoading', () => {
    it('should return the pages loading', () => {
      const result = selectPagesLoading.projector(initialState.status);

      expect(result).toEqual(initialState.status.loading);
    });
  });
});
