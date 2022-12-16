import { CatalogState } from '../reducers';
import {
  selectAttributeTypesState,
  selectAttributeTypesList,
} from './attribute-types.selectors';

describe('AttributeTypes Selectors', () => {
  let initialState: CatalogState;

  beforeEach(() => {
    initialState = {
      products: {
        list: [],
        selectedProductId: null,
        photos: [],
      },
      categories: {
        list: [],
        groups: [],
        selectedCategoryId: null,
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

  describe('selectAttributeTypesState', () => {
    it('should select the attributeTypes state', () => {
      const result = selectAttributeTypesState.projector(initialState);
      expect(result).toEqual(initialState.attributeTypes);
    });
  });

  describe('selectAttributeTypesList', () => {
    it('should select the attribute types list', () => {
      const result = selectAttributeTypesList.projector(
        initialState.attributeTypes,
      );
      expect(result).toEqual(initialState.attributeTypes.list);
    });
  });
});
