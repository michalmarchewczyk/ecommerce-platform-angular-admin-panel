import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';

export interface State {}

export const initialState: State = {};

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>(
  'Root reducers token',
  {
    factory: () => ({}),
  },
);
