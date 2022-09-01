import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeliveriesApiService } from '../../../core/api';
import { DeliveriesActions, OrdersActions } from '../actions';
import { exhaustMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class DeliveriesEffects {
  constructor(
    private actions$: Actions,
    private deliveriesApi: DeliveriesApiService,
  ) {}

  loadDeliveryMethods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.loadDeliveryMethods, OrdersActions.loadOrders),
      exhaustMap(() =>
        this.deliveriesApi.getDeliveryMethods().pipe(
          map((deliveryMethods) =>
            DeliveriesActions.loadDeliveryMethodsSuccess({ deliveryMethods }),
          ),
          catchError(({ error }) =>
            of(
              DeliveriesActions.loadDeliveryMethodsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  createDeliveryMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.createDeliveryMethod),
      exhaustMap(({ data }) =>
        this.deliveriesApi.createDeliveryMethod(data).pipe(
          map((newDeliveryMethod) =>
            DeliveriesActions.createDeliveryMethodSuccess({
              deliveryMethod: newDeliveryMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              DeliveriesActions.createDeliveryMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateDeliveryMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.updateDeliveryMethod),
      exhaustMap(({ methodId, data }) =>
        this.deliveriesApi.updateDeliveryMethod(methodId, data).pipe(
          map((updatedDeliveryMethod) =>
            DeliveriesActions.updateDeliveryMethodSuccess({
              methodId,
              deliveryMethod: updatedDeliveryMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              DeliveriesActions.updateDeliveryMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteDeliveryMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.deleteDeliveryMethod),
      exhaustMap(({ methodId }) =>
        this.deliveriesApi.deleteDeliveryMethod(methodId).pipe(
          map(() =>
            DeliveriesActions.deleteDeliveryMethodSuccess({ methodId }),
          ),
          catchError(({ error }) =>
            of(
              DeliveriesActions.deleteDeliveryMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
