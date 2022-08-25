import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { OrdersEffects } from './orders.effects';
import { OrdersActions } from '../actions';

describe('OrdersEffects', () => {
  let actions$: Observable<any>;
  let effects: OrdersEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(OrdersEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadOrders$', () => {
    it('should return a loadOrdersSuccess action', (done) => {
      actions$ = of(OrdersActions.loadOrders());

      effects.loadOrders$.subscribe((result) => {
        expect(result).toEqual(OrdersActions.loadOrdersSuccess({ orders: [] }));
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadOrdersFailure action', (done) => {
      actions$ = of(OrdersActions.loadOrders());

      effects.loadOrders$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.loadOrdersFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });

  describe('getOrder$', () => {
    it('should return a getOrderSuccess action', (done) => {
      actions$ = of(OrdersActions.getOrder({ orderId: 1 }));

      effects.getOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.getOrderSuccess({
            order: { id: 1, status: 'pending' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush({ id: 1, status: 'pending' });
    });

    it('should return a getOrderFailure action', (done) => {
      actions$ = of(OrdersActions.getOrder({ orderId: 1 }));

      effects.getOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.getOrderFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });

  describe('selectOrder$', () => {
    it('should dispatch getOrder action', (done) => {
      actions$ = of(OrdersActions.selectOrder({ orderId: 1 }));

      effects.selectOrder$.subscribe((result) => {
        expect(result).toEqual(OrdersActions.getOrder({ orderId: 1 }));
        done();
      });
    });
  });

  describe('createOrder$', () => {
    it('should return a createOrderSuccess action', (done) => {
      actions$ = of(
        OrdersActions.createOrder({
          data: { items: [], fullName: 'test' } as any,
        }),
      );

      effects.createOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.createOrderSuccess({
            order: { id: 1, items: [], fullName: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ id: 1, items: [], fullName: 'test' });
    });

    it('should return a createOrderFailure action', (done) => {
      actions$ = of(
        OrdersActions.createOrder({
          data: { items: [], fullName: 'test' } as any,
        }),
      );

      effects.createOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.createOrderFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });

  describe('updateOrder$', () => {
    it('should return a updateOrderSuccess action', (done) => {
      actions$ = of(
        OrdersActions.updateOrder({
          orderId: 1,
          data: { items: [], fullName: 'test' } as any,
        }),
      );

      effects.updateOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.updateOrderSuccess({
            orderId: 1,
            order: { id: 1, items: [], fullName: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush({ id: 1, items: [], fullName: 'test' });
    });

    it('should return a updateOrderFailure action', (done) => {
      actions$ = of(
        OrdersActions.updateOrder({
          orderId: 1,
          data: { items: [], fullName: 'test' } as any,
        }),
      );

      effects.updateOrder$.subscribe((result) => {
        expect(result).toEqual(
          OrdersActions.updateOrderFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });
});
