import { createReducer, on } from '@ngrx/store';
import { DeliveryMethod } from '../../../core/api';
import { DeliveryMethodsActions } from '../actions';

export const deliveryMethodsFeatureKey = 'deliveryMethods';

export interface State {
  list: DeliveryMethod[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    DeliveryMethodsActions.loadDeliveryMethodsSuccess,
    (state, { deliveryMethods }): State => ({
      ...state,
      list: deliveryMethods,
    }),
  ),
  on(
    DeliveryMethodsActions.createDeliveryMethodSuccess,
    (state, { deliveryMethod }): State => ({
      ...state,
      list: [...state.list, deliveryMethod],
    }),
  ),
  on(
    DeliveryMethodsActions.updateDeliveryMethodSuccess,
    (state, { methodId, deliveryMethod }): State => ({
      ...state,
      list: state.list.map((m) => (m.id === methodId ? deliveryMethod : m)),
    }),
  ),
  on(
    DeliveryMethodsActions.deleteDeliveryMethodSuccess,
    (state, { methodId }): State => ({
      ...state,
      list: state.list.filter((m) => m.id !== methodId),
    }),
  ),
);
