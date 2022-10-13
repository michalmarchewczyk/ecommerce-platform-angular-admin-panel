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
    it('should set the list of categories', () => {
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

  describe('load category groups success action', () => {
    it('should set the list of category groups', () => {
      const categoryGroup = { name: 'test' } as any;
      const action = CategoriesActions.loadCategoryGroupsSuccess({
        categoryGroups: [categoryGroup],
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        groups: [categoryGroup],
      });
    });
  });

  describe('select category action', () => {
    it('should set the selected category id', () => {
      const action = CategoriesActions.selectCategory({
        categoryId: 1,
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        selectedCategoryId: 1,
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
            {
              ...category,
              id: 3,
              parentCategory: {
                id: 1,
              },
            },
          ] as any[],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [
          { ...category, id: 2 },
          { ...category, id: 3, parentCategory: undefined },
        ],
      });
    });
  });

  describe('get category products success action', () => {
    it('should update the category in the list', () => {
      const category = { id: 1, name: 'Category 1' } as Category;
      const products = [{ id: 1, name: 'Product 1' } as any];
      const action = CategoriesActions.getCategoryProductsSuccess({
        categoryId: 1,
        products,
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
          { ...category, products },
          { ...category, id: 2 },
        ],
      });
    });
  });

  describe('add category product success action', () => {
    it('should add the product to the category in the list', () => {
      const category = { id: 1, name: 'Category 1', products: [] } as any;
      const product = { id: 1, name: 'Product 1' } as any;
      const action = CategoriesActions.addCategoryProductSuccess({
        categoryId: 1,
        product,
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
          {
            ...category,
            products: [product],
          },
          { ...category, id: 2 },
        ],
      });
    });
  });

  describe('delete category product success action', () => {
    it('should delete the product from the category in the list', () => {
      const product = { id: 1, name: 'Product 1' } as any;
      const category = {
        id: 1,
        name: 'Category 1',
        products: [product],
      } as any;
      const action = CategoriesActions.deleteCategoryProductSuccess({
        categoryId: 1,
        productId: 1,
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
          {
            ...category,
            products: [],
          },
          {
            ...category,
            id: 2,
          },
        ],
      });
    });
  });
});
