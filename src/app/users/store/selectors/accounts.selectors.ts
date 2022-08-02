import { createSelector } from '@ngrx/store';
import * as fromAccounts from '../reducers/accounts.reducer';
import { selectUsersState } from './index';

export const selectAccountsState = createSelector(
  selectUsersState,
  (state) => state[fromAccounts.accountsFeatureKey],
);

export const selectUsersList = createSelector(
  selectAccountsState,
  (state) => state.list,
);
