import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { DeliveryMethodsEffects } from './delivery-methods.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DeliveryMethodsActions } from '../actions';

describe('DeliveryMethodsEffects', () => {
  let actions$: Observable<any>;
  let effects: DeliveryMethodsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryMethodsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(DeliveryMethodsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadDeliveryMethods$', () => {
    it('should return a loadDeliveryMethodsSuccess action', (done) => {
      actions$ = of(DeliveryMethodsActions.loadDeliveryMethods());

      effects.loadDeliveryMethods$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.loadDeliveryMethodsSuccess({
            deliveryMethods: [],
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadDeliveryMethodsFailure action', (done) => {
      actions$ = of(DeliveryMethodsActions.loadDeliveryMethods());

      effects.loadDeliveryMethods$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.loadDeliveryMethodsFailure({ error: 'error' }),
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
        DeliveryMethodsActions.createDeliveryMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.createDeliveryMethodSuccess({
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
        DeliveryMethodsActions.createDeliveryMethod({
          data: { name: 'test' } as any,
        }),
      );

      effects.createDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.createDeliveryMethodFailure({
            error: 'error',
          }),
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
        DeliveryMethodsActions.updateDeliveryMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updateDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.updateDeliveryMethodSuccess({
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
        DeliveryMethodsActions.updateDeliveryMethod({
          methodId: 1,
          data: { id: 1, name: 'test' } as any,
        }),
      );

      effects.updateDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.updateDeliveryMethodFailure({
            error: 'error',
          }),
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
      actions$ = of(
        DeliveryMethodsActions.deleteDeliveryMethod({ methodId: 1 }),
      );

      effects.deleteDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.deleteDeliveryMethodSuccess({ methodId: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deleteDeliveryMethodFailure action', (done) => {
      actions$ = of(
        DeliveryMethodsActions.deleteDeliveryMethod({ methodId: 1 }),
      );

      effects.deleteDeliveryMethod$.subscribe((result) => {
        expect(result).toEqual(
          DeliveryMethodsActions.deleteDeliveryMethodFailure({
            error: 'error',
          }),
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
