import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { PaymentsEffects } from './payments.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PaymentsActions } from '../actions';

describe('PaymentsEffects', () => {
  let actions$: Observable<any>;
  let effects: PaymentsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PaymentsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPaymentMethods$', () => {
    it('should return a loadPaymentMethodsSuccess action', (done) => {
      actions$ = of(PaymentsActions.loadPaymentMethods());

      effects.loadPaymentMethods$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.loadPaymentMethodsSuccess({ paymentMethods: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadPaymentMethodsFailure action', (done) => {
      actions$ = of(PaymentsActions.loadPaymentMethods());

      effects.loadPaymentMethods$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.loadPaymentMethodsFailure({ error: 'error' }),
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
        PaymentsActions.createPaymentMethod({ data: { name: 'test' } as any }),
      );

      effects.createPaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.createPaymentMethodSuccess({
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
        PaymentsActions.createPaymentMethod({ data: { name: 'test' } as any }),
      );

      effects.createPaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.createPaymentMethodFailure({ error: 'error' }),
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
        PaymentsActions.updatePaymentMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updatePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.updatePaymentMethodSuccess({
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
        PaymentsActions.updatePaymentMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updatePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.updatePaymentMethodFailure({ error: 'error' }),
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
      actions$ = of(PaymentsActions.deletePaymentMethod({ methodId: 1 }));

      effects.deletePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.deletePaymentMethodSuccess({ methodId: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deletePaymentMethodFailure action', (done) => {
      actions$ = of(PaymentsActions.deletePaymentMethod({ methodId: 1 }));

      effects.deletePaymentMethod$.subscribe((result) => {
        expect(result).toEqual(
          PaymentsActions.deletePaymentMethodFailure({ error: 'error' }),
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
