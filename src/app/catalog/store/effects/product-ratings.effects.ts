import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductRatingsApiService } from '../../../core/api';
import { ProductRatingsActions } from '../actions';
import { concatMap, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProductRatingsEffects {
  constructor(
    private actions$: Actions,
    private productRatingsApi: ProductRatingsApiService,
  ) {}

  loadProductRatings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductRatingsActions.loadProductRatings),
      switchMap(({ productId }) =>
        this.productRatingsApi.getProductRatings(productId).pipe(
          map((productRatings) =>
            ProductRatingsActions.loadProductRatingsSuccess({
              productId,
              productRatings,
            }),
          ),
          catchError(({ error }) =>
            of(
              ProductRatingsActions.loadProductRatingsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteProductRating$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductRatingsActions.deleteProductRating),
      concatMap(({ productId, id }) =>
        this.productRatingsApi.deleteProductRating(productId, id).pipe(
          map(() =>
            ProductRatingsActions.deleteProductRatingSuccess({
              productId,
              id,
            }),
          ),
          catchError(({ error }) =>
            of(
              ProductRatingsActions.deleteProductRatingFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
