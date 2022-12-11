import { createReducer, on } from '@ngrx/store';
import { AttributeType } from '../../../core/api';
import { AttributeTypesActions } from '../actions';

export const attributeTypesFeatureKey = 'attributeTypes';

export interface State {
  list: AttributeType[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    AttributeTypesActions.getAttributeTypesSuccess,
    (state, { attributeTypes }): State => ({
      ...state,
      list: attributeTypes,
    }),
  ),
  on(
    AttributeTypesActions.addAttributeTypeSuccess,
    (state, { attributeType }): State => ({
      ...state,
      list: [...state.list, attributeType],
    }),
  ),
  on(
    AttributeTypesActions.updateAttributeTypeSuccess,
    (state, { id, attributeType }): State => ({
      ...state,
      list: state.list.map((item) => (item.id === id ? attributeType : item)),
    }),
  ),
  on(
    AttributeTypesActions.deleteAttributeTypeSuccess,
    (state, { id }): State => ({
      ...state,
      list: state.list.filter((item) => item.id !== id),
    }),
  ),
);
