import { CatalogState } from '../reducers';
import {
  selectCategoriesList,
  selectCategoriesState,
} from './categories.selectors';

describe('Categories Selectors', () => {
  let initialState: CatalogState;

  beforeEach(() => {
    initialState = {
      products: {
        list: [],
        selectedProductId: null,
      },
      categories: {
        list: [],
      },
      attributes: {
        list: [],
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
});
