import { createAction, props } from '@ngrx/store';
import { Return, ReturnCreateDto, ReturnUpdateDto } from '../../../core/api';

export const loadReturns = createAction('[Returns] Load Returns');

export const loadReturnsSuccess = createAction(
  '[Returns] Load Returns Success',
  props<{ returns: Return[] }>(),
);

export const loadReturnsFailure = createAction(
  '[Returns] Load Returns Failure',
  props<{ error: string }>(),
);

export const selectReturn = createAction(
  '[Returns] Select Return',
  props<{ returnId: number }>(),
);

export const getReturn = createAction(
  '[Returns] Get Return',
  props<{ returnId: number }>(),
);

export const getReturnSuccess = createAction(
  '[Returns] Get Return Success',
  props<{ return: Return }>(),
);

export const getReturnFailure = createAction(
  '[Returns] Get Return Failure',
  props<{ error: string }>(),
);

export const createReturn = createAction(
  '[Returns] Create Return',
  props<{ data: ReturnCreateDto }>(),
);

export const createReturnSuccess = createAction(
  '[Returns] Create Return Success',
  props<{ return: Return }>(),
);

export const createReturnFailure = createAction(
  '[Returns] Create Return Failure',
  props<{ error: string }>(),
);

export const updateReturn = createAction(
  '[Returns] Update Return',
  props<{ returnId: number; data: ReturnUpdateDto }>(),
);

export const updateReturnSuccess = createAction(
  '[Returns] Update Return Success',
  props<{ returnId: number; return: Return }>(),
);

export const updateReturnFailure = createAction(
  '[Returns] Update Return Failure',
  props<{ error: string }>(),
);
