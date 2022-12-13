import { reducer, initialState } from './pages.reducer';
import { PagesActions } from '../actions';
import { Page } from '../../../core/api';

describe('Pages Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load pages success action', () => {
    it('should set the list of pages', () => {
      const pages: Page[] = [];
      const action = PagesActions.loadPagesSuccess({ pages });

      const result = reducer(initialState, action);

      expect(result.list).toEqual(pages);
    });
  });

  describe('load page groups success action', () => {
    it('should set the list of page groups', () => {
      const pageGroup = { name: 'test' } as any;
      const action = PagesActions.loadPageGroupsSuccess({
        pageGroups: [pageGroup],
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        groups: [pageGroup],
      });
    });
  });

  describe('create page success action', () => {
    it('should add the page to the list', () => {
      const page: Page = {
        id: 1,
        title: 'test',
        content: 'content',
      } as Page;
      const action = PagesActions.createPageSuccess({ page });

      const result = reducer(
        { ...initialState, list: [{ id: 2, title: 'test 2' } as Page] },
        action,
      );

      expect(result.list).toEqual([{ id: 2, title: 'test 2' } as Page, page]);
    });
  });

  describe('update page success action', () => {
    it('should update the page in the list', () => {
      const page: Page = {
        id: 1,
        title: 'test',
        content: 'content',
      } as Page;
      const action = PagesActions.updatePageSuccess({
        pageId: 1,
        page: { ...page, content: 'content updated' },
      });

      const result = reducer(
        {
          ...initialState,
          list: [page, { id: 2, title: 'test 2' }] as Page[],
        },
        action,
      );

      expect(result.list).toEqual([
        { ...page, content: 'content updated' },
        { id: 2, title: 'test 2' },
      ] as Page[]);
    });
  });

  describe('delete page success action', () => {
    it('should remove the page from the list', () => {
      const page: Page = {
        id: 1,
        title: 'test',
        content: 'content',
      } as Page;
      const action = PagesActions.deletePageSuccess({ pageId: 1 });

      const result = reducer(
        {
          ...initialState,
          list: [page, { id: 2, title: 'test 2' }] as Page[],
        },
        action,
      );

      expect(result.list).toEqual([{ id: 2, title: 'test 2' }] as Page[]);
    });
  });
});
