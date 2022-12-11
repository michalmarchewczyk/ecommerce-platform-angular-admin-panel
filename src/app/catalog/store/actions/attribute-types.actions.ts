import { createAction, props } from '@ngrx/store';
import { AttributeType, AttributeTypeDto } from '../../../core/api';

export const getAttributeTypes = createAction(
  '[AttributeTypes] Get Attribute Types',
);

export const getAttributeTypesSuccess = createAction(
  '[AttributeTypes] Get Attribute Types Success',
  props<{ attributeTypes: AttributeType[] }>(),
);

export const getAttributeTypesFailure = createAction(
  '[AttributeTypes] Get Attribute Types Failure',
  props<{ error: string }>(),
);

export const addAttributeType = createAction(
  '[AttributeTypes] Add Attribute Type',
  props<{ data: AttributeTypeDto }>(),
);

export const addAttributeTypeSuccess = createAction(
  '[AttributeTypes] Add Attribute Type Success',
  props<{ attributeType: AttributeType }>(),
);

export const addAttributeTypeFailure = createAction(
  '[AttributeTypes] Add Attribute Type Failure',
  props<{ error: string }>(),
);

export const updateAttributeType = createAction(
  '[AttributeTypes] Update Attribute Type',
  props<{ id: number; data: AttributeTypeDto }>(),
);

export const updateAttributeTypeSuccess = createAction(
  '[AttributeTypes] Update Attribute Type Success',
  props<{ id: number; attributeType: AttributeType }>(),
);

export const updateAttributeTypeFailure = createAction(
  '[AttributeTypes] Update Attribute Type Failure',
  props<{ error: string }>(),
);

export const deleteAttributeType = createAction(
  '[AttributeTypes] Delete Attribute Type',
  props<{ id: number }>(),
);

export const deleteAttributeTypeSuccess = createAction(
  '[AttributeTypes] Delete Attribute Type Success',
  props<{ id: number }>(),
);

export const deleteAttributeTypeFailure = createAction(
  '[AttributeTypes] Delete Attribute Type Failure',
  props<{ error: string }>(),
);
