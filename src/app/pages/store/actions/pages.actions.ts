import { createAction, props } from '@ngrx/store';
import {
  Page,
  PageCreateDto,
  PageGroup,
  PageUpdateDto,
} from '../../../core/api';

export const loadPages = createAction('[Pages] Load Pages');

export const loadPagesSuccess = createAction(
  '[Pages] Load Pages Success',
  props<{ pages: Page[] }>(),
);

export const loadPagesFailure = createAction(
  '[Pages] Load Pages Failure',
  props<{ error: string }>(),
);

export const loadPageGroups = createAction('[Pages] Load Page Groups');

export const loadPageGroupsSuccess = createAction(
  '[Pages] Load Page Groups Success',
  props<{ pageGroups: PageGroup[] }>(),
);

export const loadPageGroupsFailure = createAction(
  '[Pages] Load Page Groups Failure',
  props<{ error: string }>(),
);

export const createPage = createAction(
  '[Pages] Create Page',
  props<{ data: PageCreateDto }>(),
);

export const createPageSuccess = createAction(
  '[Pages] Create Page Success',
  props<{ page: Page }>(),
);

export const createPageFailure = createAction(
  '[Pages] Create Page Failure',
  props<{ error: string }>(),
);

export const updatePage = createAction(
  '[Pages] Update Page',
  props<{ pageId: number; data: PageUpdateDto }>(),
);

export const updatePageSuccess = createAction(
  '[Pages] Update Page Success',
  props<{ pageId: number; page: Page }>(),
);

export const updatePageFailure = createAction(
  '[Pages] Update Page Failure',
  props<{ error: string }>(),
);

export const deletePage = createAction(
  '[Pages] Delete Page',
  props<{ pageId: number }>(),
);

export const deletePageSuccess = createAction(
  '[Pages] Delete Page Success',
  props<{ pageId: number }>(),
);

export const deletePageFailure = createAction(
  '[Pages] Delete Page Failure',
  props<{ error: string }>(),
);
