import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersApiService } from '../../../core/api';
import { OrdersActions } from '../actions';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private ordersApi: OrdersApiService) {}

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      exhaustMap(() =>
        this.ordersApi.getOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(({ error }) =>
            of(OrdersActions.loadOrdersFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  getOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.getOrder),
      exhaustMap(({ orderId }) =>
        this.ordersApi.getOrder(orderId).pipe(
          map((order) => OrdersActions.getOrderSuccess({ order })),
          catchError(({ error }) =>
            of(OrdersActions.getOrderFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  selectOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.selectOrderNumber),
      filter(({ orderId }) => orderId !== null),
      map(({ orderId }) => OrdersActions.getOrder({ orderId })),
    );
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      exhaustMap(({ data }) =>
        this.ordersApi.createOrder(data).pipe(
          map((newOrder) =>
            OrdersActions.createOrderSuccess({ order: newOrder }),
          ),
          catchError(({ error }) =>
            of(OrdersActions.createOrderFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      exhaustMap(({ orderId, data }) =>
        this.ordersApi.updateOrder(orderId, data).pipe(
          map((updatedOrder) =>
            OrdersActions.updateOrderSuccess({ orderId, order: updatedOrder }),
          ),
          catchError(({ error }) =>
            of(OrdersActions.updateOrderFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });
}
