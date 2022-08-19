import { createReducer, on } from '@ngrx/store';
import { DeliveryMethod } from '../../../core/api';
import { DeliveriesActions } from '../actions';

export const deliveriesFeatureKey = 'deliveries';

export interface State {
  list: DeliveryMethod[];
}

export const initialState: State = {
  list: [],
};

export const reducer = createReducer(
  initialState,
  on(
    DeliveriesActions.loadDeliveryMethodsSuccess,
    (state, { deliveryMethods }): State => ({
      ...state,
      list: deliveryMethods,
    }),
  ),
  on(
    DeliveriesActions.createDeliveryMethodSuccess,
    (state, { deliveryMethod }): State => ({
      ...state,
      list: [...state.list, deliveryMethod],
    }),
  ),
  on(
    DeliveriesActions.updateDeliveryMethodSuccess,
    (state, { methodId, deliveryMethod }): State => ({
      ...state,
      list: state.list.map((m) => (m.id === methodId ? deliveryMethod : m)),
    }),
  ),
  on(
    DeliveriesActions.deleteDeliveryMethodSuccess,
    (state, { methodId }): State => ({
      ...state,
      list: state.list.filter((m) => m.id !== methodId),
    }),
  ),
);
