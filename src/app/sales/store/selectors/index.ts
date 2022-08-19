import { salesFeatureKey, SalesState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

export const selectSalesState =
  createFeatureSelector<SalesState>(salesFeatureKey);
