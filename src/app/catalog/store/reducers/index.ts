import * as fromProducts from './products.reducer';
import * as fromCategories from './categories.reducer';
import * as fromAttributeTypes from './attribute-types.reducer';
import * as fromProductRatings from './product-ratings.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { Action, combineReducers } from '@ngrx/store';

export const catalogFeatureKey = 'catalog';

export interface CatalogState {
  [fromProducts.productsFeatureKey]: fromProducts.State;
  [fromCategories.categoriesFeatureKey]: fromCategories.State;
  [fromAttributeTypes.attributeTypesFeatureKey]: fromAttributeTypes.State;
  [fromProductRatings.productRatingsFeatureKey]: fromProductRatings.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [catalogFeatureKey]: CatalogState;
}

export const reducers = (state: CatalogState | undefined, action: Action) =>
  combineReducers({
    [fromProducts.productsFeatureKey]: fromProducts.reducer,
    [fromCategories.categoriesFeatureKey]: fromCategories.reducer,
    [fromAttributeTypes.attributeTypesFeatureKey]: fromAttributeTypes.reducer,
    [fromProductRatings.productRatingsFeatureKey]: fromProductRatings.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
