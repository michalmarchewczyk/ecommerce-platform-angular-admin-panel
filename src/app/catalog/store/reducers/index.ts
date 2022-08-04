import * as fromProducts from './products.reducer';
import * as fromCategories from './categories.reducer';
import * as fromAttributes from './attributes.reducer';
import * as fromRoot from '../../../core/store';
import { Action, combineReducers } from '@ngrx/store';

export const catalogFeatureKey = 'catalog';

export interface CatalogState {
  [fromProducts.productsFeatureKey]: fromProducts.State;
  [fromCategories.categoriesFeatureKey]: fromCategories.State;
  [fromAttributes.attributesFeatureKey]: fromAttributes.State;
}

export interface State extends fromRoot.State {
  [catalogFeatureKey]: CatalogState;
}

export const reducers = (state: CatalogState | undefined, action: Action) =>
  combineReducers({
    [fromProducts.productsFeatureKey]: fromProducts.reducer,
    [fromCategories.categoriesFeatureKey]: fromCategories.reducer,
    [fromAttributes.attributesFeatureKey]: fromAttributes.reducer,
  })(state, action);
