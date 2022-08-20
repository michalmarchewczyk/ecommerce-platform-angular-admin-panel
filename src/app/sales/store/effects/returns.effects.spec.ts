import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ReturnsEffects } from './returns.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReturnsActions } from '../actions';

describe('ReturnsEffects', () => {
  let actions$: Observable<any>;
  let effects: ReturnsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReturnsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ReturnsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadReturns$', () => {
    it('should return a loadReturnsSuccess action', (done) => {
      actions$ = of(ReturnsActions.loadReturns());

      effects.loadReturns$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.loadReturnsSuccess({ returns: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadReturnsFailure action', (done) => {
      actions$ = of(ReturnsActions.loadReturns());

      effects.loadReturns$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.loadReturnsFailure({ error: 'error' }),
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

  describe('getReturn$', () => {
    it('should return a getReturnSuccess action', (done) => {
      actions$ = of(ReturnsActions.getReturn({ returnId: 1 }));

      effects.getReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.getReturnSuccess({
            return: { id: 1, status: 'open' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'GET' })
        .flush({ id: 1, status: 'open' });
    });

    it('should return a getReturnFailure action', (done) => {
      actions$ = of(ReturnsActions.getReturn({ returnId: 1 }));

      effects.getReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.getReturnFailure({ error: 'error' }),
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

  describe('createReturn$', () => {
    it('should return a createReturnSuccess action', (done) => {
      actions$ = of(
        ReturnsActions.createReturn({
          data: { message: 'test' } as any,
        }),
      );

      effects.createReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.createReturnSuccess({
            return: { id: 1, message: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ id: 1, message: 'test' });
    });

    it('should return a createReturnFailure action', (done) => {
      actions$ = of(
        ReturnsActions.createReturn({
          data: { message: 'test' } as any,
        }),
      );

      effects.createReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.createReturnFailure({ error: 'error' }),
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

  describe('updateReturn$', () => {
    it('should return a updateReturnSuccess action', (done) => {
      actions$ = of(
        ReturnsActions.updateReturn({
          returnId: 1,
          data: { message: 'test' } as any,
        }),
      );

      effects.updateReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.updateReturnSuccess({
            returnId: 1,
            return: { id: 1, message: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush({ id: 1, message: 'test' });
    });

    it('should return a updateReturnFailure action', (done) => {
      actions$ = of(
        ReturnsActions.updateReturn({
          returnId: 1,
          data: { message: 'test' } as any,
        }),
      );

      effects.updateReturn$.subscribe((result) => {
        expect(result).toEqual(
          ReturnsActions.updateReturnFailure({ error: 'error' }),
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
