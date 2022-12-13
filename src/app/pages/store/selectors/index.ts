import { createFeatureSelector } from '@ngrx/store';
import { pagesFeatureKey, PagesState } from '../reducers';

export const selectPagesState =
  createFeatureSelector<PagesState>(pagesFeatureKey);
