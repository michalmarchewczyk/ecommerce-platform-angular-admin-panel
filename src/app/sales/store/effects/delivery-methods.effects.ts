import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeliveryMethodsApiService } from '../../../core/api';
import { DeliveryMethodsActions, OrdersActions } from '../actions';
import { exhaustMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class DeliveryMethodsEffects {
  constructor(
    private actions$: Actions,
    private deliveryMethodsApi: DeliveryMethodsApiService,
  ) {}

  loadDeliveryMethods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DeliveryMethodsActions.loadDeliveryMethods,
        OrdersActions.loadOrders,
      ),
      exhaustMap(() =>
        this.deliveryMethodsApi.getDeliveryMethods().pipe(
          map((deliveryMethods) =>
            DeliveryMethodsActions.loadDeliveryMethodsSuccess({
              deliveryMethods,
            }),
          ),
          catchError(({ error }) =>
            of(
              DeliveryMethodsActions.loadDeliveryMethodsFailure({
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
      ofType(DeliveryMethodsActions.createDeliveryMethod),
      exhaustMap(({ data }) =>
        this.deliveryMethodsApi.createDeliveryMethod(data).pipe(
          map((newDeliveryMethod) =>
            DeliveryMethodsActions.createDeliveryMethodSuccess({
              deliveryMethod: newDeliveryMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              DeliveryMethodsActions.createDeliveryMethodFailure({
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
      ofType(DeliveryMethodsActions.updateDeliveryMethod),
      exhaustMap(({ methodId, data }) =>
        this.deliveryMethodsApi.updateDeliveryMethod(methodId, data).pipe(
          map((updatedDeliveryMethod) =>
            DeliveryMethodsActions.updateDeliveryMethodSuccess({
              methodId,
              deliveryMethod: updatedDeliveryMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              DeliveryMethodsActions.updateDeliveryMethodFailure({
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
      ofType(DeliveryMethodsActions.deleteDeliveryMethod),
      exhaustMap(({ methodId }) =>
        this.deliveryMethodsApi.deleteDeliveryMethod(methodId).pipe(
          map(() =>
            DeliveryMethodsActions.deleteDeliveryMethodSuccess({ methodId }),
          ),
          catchError(({ error }) =>
            of(
              DeliveryMethodsActions.deleteDeliveryMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
