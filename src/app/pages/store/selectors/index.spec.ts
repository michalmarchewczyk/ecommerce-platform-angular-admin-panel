import { selectPagesState } from './index';
import { PagesState } from '../reducers';

describe('Pages Selectors', () => {
  let initialState: PagesState;

  beforeEach(() => {
    initialState = {
      pages: {
        list: [],
        groups: [],
      },
      status: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectPagesState', () => {
    it('should select the pages state', () => {
      const result = selectPagesState.projector(initialState);

      expect(result).toEqual(initialState);
    });
  });
});
