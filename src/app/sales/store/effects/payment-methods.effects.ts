import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentMethodsApiService } from '../../../core/api';
import { OrdersActions, PaymentMethodsActions } from '../actions';
import { exhaustMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class PaymentMethodsEffects {
  constructor(
    private actions$: Actions,
    private paymentMethodsApi: PaymentMethodsApiService,
  ) {}

  loadPaymentMethods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        PaymentMethodsActions.loadPaymentMethods,
        OrdersActions.loadOrders,
      ),
      exhaustMap(() =>
        this.paymentMethodsApi.getPaymentMethods().pipe(
          map((paymentMethods) =>
            PaymentMethodsActions.loadPaymentMethodsSuccess({ paymentMethods }),
          ),
          catchError(({ error }) =>
            of(
              PaymentMethodsActions.loadPaymentMethodsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  createPaymentMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentMethodsActions.createPaymentMethod),
      exhaustMap(({ data }) =>
        this.paymentMethodsApi.createPaymentMethod(data).pipe(
          map((newPaymentMethod) =>
            PaymentMethodsActions.createPaymentMethodSuccess({
              paymentMethod: newPaymentMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              PaymentMethodsActions.createPaymentMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  updatePaymentMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentMethodsActions.updatePaymentMethod),
      exhaustMap(({ methodId, data }) =>
        this.paymentMethodsApi.updatePaymentMethod(methodId, data).pipe(
          map((updatedPaymentMethod) =>
            PaymentMethodsActions.updatePaymentMethodSuccess({
              methodId,
              paymentMethod: updatedPaymentMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              PaymentMethodsActions.updatePaymentMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deletePaymentMethod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentMethodsActions.deletePaymentMethod),
      exhaustMap(({ methodId }) =>
        this.paymentMethodsApi.deletePaymentMethod(methodId).pipe(
          map(() =>
            PaymentMethodsActions.deletePaymentMethodSuccess({ methodId }),
          ),
          catchError(({ error }) =>
            of(
              PaymentMethodsActions.deletePaymentMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
