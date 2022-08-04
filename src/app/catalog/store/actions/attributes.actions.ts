import { createAction, props } from '@ngrx/store';
import { AttributeType, AttributeTypeDto } from '../../../core/api';

export const getAttributeTypes = createAction(
  '[Attributes] Get Attribute Types',
);

export const getAttributeTypesSuccess = createAction(
  '[Attributes] Get Attribute Types Success',
  props<{ attributeTypes: AttributeType[] }>(),
);

export const getAttributeTypesFailure = createAction(
  '[Attributes] Get Attribute Types Failure',
  props<{ error: string }>(),
);

export const addAttributeType = createAction(
  '[Attributes] Add Attribute Type',
  props<{ data: AttributeTypeDto }>(),
);

export const addAttributeTypeSuccess = createAction(
  '[Attributes] Add Attribute Type Success',
  props<{ attributeType: AttributeType }>(),
);

export const addAttributeTypeFailure = createAction(
  '[Attributes] Add Attribute Type Failure',
  props<{ error: string }>(),
);

export const updateAttributeType = createAction(
  '[Attributes] Update Attribute Type',
  props<{ id: number; data: AttributeTypeDto }>(),
);

export const updateAttributeTypeSuccess = createAction(
  '[Attributes] Update Attribute Type Success',
  props<{ id: number; attributeType: AttributeType }>(),
);

export const updateAttributeTypeFailure = createAction(
  '[Attributes] Update Attribute Type Failure',
  props<{ error: string }>(),
);

export const deleteAttributeType = createAction(
  '[Attributes] Delete Attribute Type',
  props<{ id: number }>(),
);

export const deleteAttributeTypeSuccess = createAction(
  '[Attributes] Delete Attribute Type Success',
  props<{ id: number }>(),
);

export const deleteAttributeTypeFailure = createAction(
  '[Attributes] Delete Attribute Type Failure',
  props<{ error: string }>(),
);
