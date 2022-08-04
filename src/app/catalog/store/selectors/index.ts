import { catalogFeatureKey, CatalogState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

export const selectCatalogState =
  createFeatureSelector<CatalogState>(catalogFeatureKey);
