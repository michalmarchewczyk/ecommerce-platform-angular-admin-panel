import { CatalogState } from '../reducers';
import {
  selectCategoriesGroups,
  selectCategoriesList,
  selectCategoriesState,
  selectSelectedCategory,
  selectSelectedCategoryId,
} from './categories.selectors';
import { Category } from '../../../core/api';

describe('Categories Selectors', () => {
  let initialState: CatalogState;

  beforeEach(() => {
    initialState = {
      products: {
        list: [],
        selectedProductId: null,
        photos: [],
      },
      categories: {
        list: [
          {
            id: 1,
            name: 'Category 1',
          },
        ] as Category[],
        groups: [{ name: 'test' } as any],
        selectedCategoryId: 1,
      },
      attributeTypes: {
        list: [],
      },
      productRatings: {
        ratings: {},
      },
      status: {
        loading: false,
        error: null,
        newProductId: null,
      },
    };
  });

  describe('selectCategoriesState', () => {
    it('should select the categories state', () => {
      const result = selectCategoriesState.projector(initialState);
      expect(result).toEqual(initialState.categories);
    });
  });

  describe('selectCategoryList', () => {
    it('should select the categories list', () => {
      const result = selectCategoriesList.projector(initialState.categories);
      expect(result).toEqual(initialState.categories.list);
    });
  });

  describe('selectCategoryGroups', () => {
    it('should select the categories groups', () => {
      const result = selectCategoriesGroups.projector(initialState.categories);
      expect(result).toEqual(initialState.categories.groups);
    });
  });

  describe('selectSelectedCategoryId', () => {
    it('should select the selected category id', () => {
      const result = selectSelectedCategoryId.projector(
        initialState.categories,
      );
      expect(result).toEqual(initialState.categories.selectedCategoryId);
    });

    it('should return null if no selected category id', () => {
      const result = selectSelectedCategoryId.projector({
        ...initialState.categories,
        selectedCategoryId: null,
      });
      expect(result).toEqual(null);
    });
  });
  describe('selectSelectedCategory', () => {
    it('should select the selected category', () => {
      const result = selectSelectedCategory.projector(
        initialState.categories.list,
        initialState.categories.selectedCategoryId,
      );
      expect(result).toEqual(initialState.categories.list[0]);
    });

    it('should return null if no selected category', () => {
      const result = selectSelectedCategory.projector(
        initialState.categories.list,
        null,
      );
      expect(result).toEqual(null);
    });
  });
});
