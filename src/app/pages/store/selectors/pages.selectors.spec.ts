import { PagesState } from '../reducers';
import { Page, PageGroup } from '../../../core/api';
import {
  selectPagesGroups,
  selectPagesList,
  selectPagesListState,
} from './pages.selectors';

describe('Pages Selectors', () => {
  let initialState: PagesState;

  beforeEach(() => {
    initialState = {
      pages: {
        list: [
          {
            id: 1,
            title: 'Test',
            content: 'Test',
          } as Page,
          {
            id: 2,
            title: 'Test 2',
            content: 'Test 2',
          } as Page,
        ],
        groups: [
          {
            id: 1,
            name: 'Test',
          } as PageGroup,
        ],
      },
      status: {
        loading: false,
        error: null,
      },
    };
  });

  describe('selectPagesListState', () => {
    it('should select the page state', () => {
      const result = selectPagesListState.projector(initialState);
      expect(result).toEqual(initialState.pages);
    });
  });

  describe('selectPagesList', () => {
    it('should select the page list', () => {
      const result = selectPagesList.projector(initialState.pages);
      expect(result).toEqual(initialState.pages.list);
    });
  });

  describe('selectPagesGroups', () => {
    it('should select the page groups', () => {
      const result = selectPagesGroups.projector(initialState.pages);
      expect(result).toEqual(initialState.pages.groups);
    });
  });
});
