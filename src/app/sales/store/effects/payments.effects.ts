import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentsApiService } from '../../../core/api';
import { PaymentsActions } from '../actions';
import { exhaustMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class PaymentsEffects {
  constructor(
    private actions$: Actions,
    private paymentsApi: PaymentsApiService,
  ) {}

  loadPaymentMethods$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentsActions.loadPaymentMethods),
      exhaustMap(() =>
        this.paymentsApi.getPaymentMethods().pipe(
          map((paymentMethods) =>
            PaymentsActions.loadPaymentMethodsSuccess({ paymentMethods }),
          ),
          catchError(({ error }) =>
            of(
              PaymentsActions.loadPaymentMethodsFailure({
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
      ofType(PaymentsActions.createPaymentMethod),
      exhaustMap(({ data }) =>
        this.paymentsApi.createPaymentMethod(data).pipe(
          map((newPaymentMethod) =>
            PaymentsActions.createPaymentMethodSuccess({
              paymentMethod: newPaymentMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              PaymentsActions.createPaymentMethodFailure({
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
      ofType(PaymentsActions.updatePaymentMethod),
      exhaustMap(({ methodId, data }) =>
        this.paymentsApi.updatePaymentMethod(methodId, data).pipe(
          map((updatedPaymentMethod) =>
            PaymentsActions.updatePaymentMethodSuccess({
              methodId,
              paymentMethod: updatedPaymentMethod,
            }),
          ),
          catchError(({ error }) =>
            of(
              PaymentsActions.updatePaymentMethodFailure({
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
      ofType(PaymentsActions.deletePaymentMethod),
      exhaustMap(({ methodId }) =>
        this.paymentsApi.deletePaymentMethod(methodId).pipe(
          map(() => PaymentsActions.deletePaymentMethodSuccess({ methodId })),
          catchError(({ error }) =>
            of(
              PaymentsActions.deletePaymentMethodFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
