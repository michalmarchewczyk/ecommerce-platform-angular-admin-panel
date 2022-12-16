import { Observable, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ProductRatingsEffects } from './product-ratings.effects';
import { ProductRatingsActions } from '../actions';

describe('ProductRatingsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductRatingsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductRatingsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ProductRatingsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadProductRatings$', () => {
    it('should return a loadProductRatingsSuccess action', (done) => {
      actions$ = of(ProductRatingsActions.loadProductRatings({ productId: 1 }));

      effects.loadProductRatings$.subscribe((result) => {
        expect(result).toEqual(
          ProductRatingsActions.loadProductRatingsSuccess({
            productId: 1,
            productRatings: [],
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadProductRatingsFailure action', (done) => {
      actions$ = of(ProductRatingsActions.loadProductRatings({ productId: 1 }));

      effects.loadProductRatings$.subscribe((result) => {
        expect(result).toEqual(
          ProductRatingsActions.loadProductRatingsFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush(
        {
          message: 'error',
        },
        {
          status: 500,
          statusText: 'Server Error',
        },
      );
    });
  });

  describe('deleteProductRating$', () => {
    it('should return a deleteProductRatingSuccess action', (done) => {
      actions$ = of(
        ProductRatingsActions.deleteProductRating({ productId: 1, id: 1 }),
      );

      effects.deleteProductRating$.subscribe((result) => {
        expect(result).toEqual(
          ProductRatingsActions.deleteProductRatingSuccess({
            productId: 1,
            id: 1,
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deleteProductRatingFailure action', (done) => {
      actions$ = of(
        ProductRatingsActions.deleteProductRating({ productId: 1, id: 1 }),
      );

      effects.deleteProductRating$.subscribe((result) => {
        expect(result).toEqual(
          ProductRatingsActions.deleteProductRatingFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(
        {
          message: 'error',
        },
        {
          status: 500,
          statusText: 'Server Error',
        },
      );
    });
  });
});
