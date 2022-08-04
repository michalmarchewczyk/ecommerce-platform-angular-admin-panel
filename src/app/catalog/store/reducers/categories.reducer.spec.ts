import { reducer, initialState } from './categories.reducer';
import { Category } from '../../../core/api';
import { CategoriesActions } from '../actions';

describe('Categories Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load categories success action', () => {
    it('should est the list of categories', () => {
      const category = { id: '1', name: 'Category 1' } as any;
      const action = CategoriesActions.loadCategoriesSuccess({
        categories: [category],
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: [category],
      });
    });
  });

  describe('add category success action', () => {
    it('should add the category to the list', () => {
      const category = { id: 1, name: 'Category 1' } as Category;
      const action = CategoriesActions.addCategorySuccess({ category });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: [category],
      });
    });
  });

  describe('update category success action', () => {
    it('should update the category in the list', () => {
      const category = { id: 1, name: 'Category 1' } as Category;
      const action = CategoriesActions.updateCategorySuccess({
        id: 1,
        category: { ...category, name: 'Category 2' },
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            category,
            {
              ...category,
              id: 2,
            },
          ],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          { ...category, name: 'Category 2' },
          { ...category, id: 2 },
        ],
      });
    });
  });

  describe('delete category success action', () => {
    it('should delete the category from the list', () => {
      const category = { id: 1, name: 'Category 1' } as Category;
      const action = CategoriesActions.deleteCategorySuccess({ id: 1 });

      const result = reducer(
        {
          ...initialState,
          list: [
            category,
            {
              ...category,
              id: 2,
            },
          ],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [{ ...category, id: 2 }],
      });
    });
  });
});
