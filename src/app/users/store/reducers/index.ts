import * as fromAccounts from './accounts.reducer';
import * as fromStatus from './status.reducer';
import * as fromRoot from '../../../core/store';
import { Action, combineReducers } from '@ngrx/store';

export const usersFeatureKey = 'users';

export interface UsersState {
  [fromAccounts.accountsFeatureKey]: fromAccounts.State;
  [fromStatus.statusFeatureKey]: fromStatus.State;
}

export interface State extends fromRoot.State {
  [usersFeatureKey]: UsersState;
}

export const reducers = (state: UsersState | undefined, action: Action) =>
  combineReducers({
    [fromAccounts.accountsFeatureKey]: fromAccounts.reducer,
    [fromStatus.statusFeatureKey]: fromStatus.reducer,
  })(state, action);
