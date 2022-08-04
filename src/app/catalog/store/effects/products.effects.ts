import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsActions } from '../actions';
import { ProductsApiService } from '../../../core/api';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsApi: ProductsApiService,
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(() =>
        this.productsApi.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError(({ error }) =>
            of(ProductsActions.loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      concatMap(({ data }) =>
        this.productsApi.createProduct(data).pipe(
          map((product) => ProductsActions.addProductSuccess({ product })),
          catchError(({ error }) =>
            of(ProductsActions.addProductFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      concatMap(({ id, data }) =>
        this.productsApi.updateProduct(id, data).pipe(
          map((product) =>
            ProductsActions.updateProductSuccess({ id, product }),
          ),
          catchError(({ error }) =>
            of(ProductsActions.updateProductFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsApi.deleteProduct(id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError(({ error }) =>
            of(ProductsActions.deleteProductFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateProductAttributes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.updateProductAttributes),
      concatMap(({ id, data }) =>
        this.productsApi.updateProductAttributes(id, data).pipe(
          map(({ attributes }) =>
            ProductsActions.updateProductAttributesSuccess({ id, attributes }),
          ),
          catchError(({ error }) =>
            of(
              ProductsActions.updateProductAttributesFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
