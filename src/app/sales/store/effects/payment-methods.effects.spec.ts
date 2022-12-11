import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { PaymentMethodsEffects } from './payment-methods.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PaymentMethodsActions } from '../actions';

describe('PaymentMethodsEffects', () => {
  let actions$: Observable<any>;
  let effects: PaymentMethodsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentMethodsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PaymentMethodsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPaymentMethods$', () => {
    it('should return a loadPaymentMethodsSuccess action', (done) => {
      actions$ = of(PaymentMethodsActions.loadPaymentMethods());

      effects.loadPaymentMethods$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.loadPaymentMethodsSuccess({
            paymentMethods: [],
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadPaymentMethodsFailure action', (done) => {
      actions$ = of(PaymentMethodsActions.loadPaymentMethods());

      effects.loadPaymentMethods$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.loadPaymentMethodsFailure({ error: 'error' }),
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

  describe('createPaymentMethod$', () => {
    it('should return a createPaymentMethodSuccess action', (done) => {
      actions$ = of(
        PaymentMethodsActions.createPaymentMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createPaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.createPaymentMethodSuccess({
            paymentMethod: { name: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ name: 'test' });
    });

    it('should return a createPaymentMethodFailure action', (done) => {
      actions$ = of(
        PaymentMethodsActions.createPaymentMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createPaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.createPaymentMethodFailure({ error: 'error' }),
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

  describe('updatePaymentMethod$', () => {
    it('should return a updatePaymentMethodSuccess action', (done) => {
      actions$ = of(
        PaymentMethodsActions.updatePaymentMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updatePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.updatePaymentMethodSuccess({
            methodId: 1,
            paymentMethod: { id: 1, name: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PUT' })
        .flush({ id: 1, name: 'test' });
    });

    it('should return a updatePaymentMethodFailure action', (done) => {
      actions$ = of(
        PaymentMethodsActions.updatePaymentMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updatePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.updatePaymentMethodFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PUT' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });

  describe('deletePaymentMethod$', () => {
    it('should return a deletePaymentMethodSuccess action', (done) => {
      actions$ = of(PaymentMethodsActions.deletePaymentMethod({ methodId: 1 }));

      effects.deletePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.deletePaymentMethodSuccess({ methodId: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deletePaymentMethodFailure action', (done) => {
      actions$ = of(PaymentMethodsActions.deletePaymentMethod({ methodId: 1 }));

      effects.deletePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentMethodsActions.deletePaymentMethodFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'DELETE' })
        .flush(
          { message: 'error' },
          { status: 500, statusText: 'Server Error' },
        );
    });
  });
});
