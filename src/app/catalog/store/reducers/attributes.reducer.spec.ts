import { reducer, initialState } from './attributes.reducer';
import { AttributeType } from '../../../core/api';
import { AttributesActions } from '../actions';

describe('Attributes Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('get attribute types success action', () => {
    it('should set the list of attribute types', () => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      const action = AttributesActions.getAttributeTypesSuccess({
        attributeTypes: [attributeType],
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: [attributeType],
      });
    });
  });

  describe('add attribute type success action', () => {
    it('should add the attribute type to the list', () => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      const action = AttributesActions.addAttributeTypeSuccess({
        attributeType,
      });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        list: [attributeType],
      });
    });
  });

  describe('update attribute type success action', () => {
    it('should update the attribute type in the list', () => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as any;
      const action = AttributesActions.updateAttributeTypeSuccess({
        id: 1,
        attributeType: {
          ...attributeType,
          name: 'Attribute Type 1 Updated',
        },
      });

      const result = reducer(
        {
          ...initialState,
          list: [
            attributeType,
            {
              ...attributeType,
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
            ...attributeType,
            name: 'Attribute Type 1 Updated',
          },
          {
            ...attributeType,
            id: 2,
          },
        ],
      });
    });
  });

  describe('delete attribute type success action', () => {
    it('should delete the attribute type from the list', () => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      const action = AttributesActions.deleteAttributeTypeSuccess({
        id: 1,
      });

      const result = reducer(
        {
          ...initialState,
          list: [attributeType, { ...attributeType, id: 2 }],
        },
        action,
      );

      expect(result).toEqual({
        ...initialState,
        list: [{ ...attributeType, id: 2 }],
      });
    });
  });
});
