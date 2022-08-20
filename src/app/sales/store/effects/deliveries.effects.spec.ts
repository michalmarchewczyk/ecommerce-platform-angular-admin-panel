import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { DeliveriesEffects } from './deliveries.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DeliveriesActions } from '../actions';

describe('DeliveriesEffects', () => {
  let actions$: Observable<any>;
  let effects: DeliveriesEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveriesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(DeliveriesEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadDeliveryMethods$', () => {
    it('should return a loadDeliveryMethodsSuccess action', (done) => {
      actions$ = of(DeliveriesActions.loadDeliveryMethods());

      effects.loadDeliveryMethods$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.loadDeliveryMethodsSuccess({ deliveryMethods: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadDeliveryMethodsFailure action', (done) => {
      actions$ = of(DeliveriesActions.loadDeliveryMethods());

      effects.loadDeliveryMethods$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.loadDeliveryMethodsFailure({ error: 'error' }),
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

  describe('createDeliveryMethod$', () => {
    it('should return a createDeliveryMethodSuccess action', (done) => {
      actions$ = of(
        DeliveriesActions.createDeliveryMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.createDeliveryMethodSuccess({
            deliveryMethod: { name: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ name: 'test' });
    });

    it('should return a createDeliveryMethodFailure action', (done) => {
      actions$ = of(
        DeliveriesActions.createDeliveryMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.createDeliveryMethodFailure({ error: 'error' }),
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

  describe('updateDeliveryMethod$', () => {
    it('should return a updateDeliveryMethodSuccess action', (done) => {
      actions$ = of(
        DeliveriesActions.updateDeliveryMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updateDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.updateDeliveryMethodSuccess({
            methodId: 1,
            deliveryMethod: { id: 1, name: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PUT' })
        .flush({ id: 1, name: 'test' });
    });

    it('should return a updateDeliveryMethodFailure action', (done) => {
      actions$ = of(
        DeliveriesActions.updateDeliveryMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updateDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.updateDeliveryMethodFailure({ error: 'error' }),
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

  describe('deleteDeliveryMethod$', () => {
    it('should return a deleteDeliveryMethodSuccess action', (done) => {
      actions$ = of(DeliveriesActions.deleteDeliveryMethod({ methodId: 1 }));

      effects.deleteDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.deleteDeliveryMethodSuccess({ methodId: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deleteDeliveryMethodFailure action', (done) => {
      actions$ = of(DeliveriesActions.deleteDeliveryMethod({ methodId: 1 }));

      effects.deleteDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveriesActions.deleteDeliveryMethodFailure({ error: 'error' }),
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
