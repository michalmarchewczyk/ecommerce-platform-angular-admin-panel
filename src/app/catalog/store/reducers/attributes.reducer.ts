import { createReducer, on } from '@ngrx/store';
import { AttributeType } from '../../../core/api';
import { AttributesActions } from '../actions';

export const attributesFeatureKey = 'attributes';

export interface State {
  list: AttributeType[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    AttributesActions.getAttributeTypesSuccess,
    (state, { attributeTypes }): State => ({
      ...state,
      list: attributeTypes,
    }),
  ),
  on(
    AttributesActions.addAttributeTypeSuccess,
    (state, { attributeType }): State => ({
      ...state,
      list: [...state.list, attributeType],
    }),
  ),
  on(
    AttributesActions.updateAttributeTypeSuccess,
    (state, { id, attributeType }): State => ({
      ...state,
      list: state.list.map((item) => (item.id === id ? attributeType : item)),
    }),
  ),
  on(
    AttributesActions.deleteAttributeTypeSuccess,
    (state, { id }): State => ({
      ...state,
      list: state.list.filter((item) => item.id !== id),
    }),
  ),
);
