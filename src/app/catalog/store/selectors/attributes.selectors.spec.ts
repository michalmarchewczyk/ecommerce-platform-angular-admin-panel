import { CatalogState } from '../reducers';
import {
  selectAttributesState,
  selectAttributeTypesList,
} from './attributes.selectors';

describe('Attributes Selectors', () => {
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

  describe('selectAttributesState', () => {
    it('should select the attributes state', () => {
      const result = selectAttributesState.projector(initialState);
      expect(result).toEqual(initialState.attributes);
    });
  });

  describe('selectAttributeTypesList', () => {
    it('should select the attributes list', () => {
      const result = selectAttributeTypesList.projector(
        initialState.attributes,
      );
      expect(result).toEqual(initialState.attributes.list);
    });
  });
});
