import * as fromPages from './pages.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { combineReducers } from '@ngrx/store';

export const pagesFeatureKey = 'pages';

export interface PagesState {
  [fromPages.pagesFeatureKey]: fromPages.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [pagesFeatureKey]: PagesState;
}

export const reducers = (state: PagesState | undefined, action: any) => {
  return combineReducers({
    [fromPages.pagesFeatureKey]: fromPages.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
};
