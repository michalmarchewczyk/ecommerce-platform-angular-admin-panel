import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesActions, ProductsActions } from '../actions';
import { ProductsApiService } from '../../../core/api';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, combineLatest, of, switchMap } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsApi: ProductsApiService,
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProducts, CategoriesActions.loadCategories),
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

  loadProductPhotos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.loadProductsSuccess),
      mergeMap(({ products }) =>
        combineLatest(
          products
            .flatMap((product) =>
              product.photos.map((photo) => ({
                ...photo,
                productId: product.id,
              })),
            )
            .map((photo) =>
              this.productsApi
                .getProductPhoto(photo.productId, photo.id, true)
                .pipe(
                  map((data) => ({
                    id: photo.id,
                    data: data,
                  })),
                  catchError(() =>
                    of({
                      id: photo.id,
                      data: null,
                    }),
                  ),
                ),
            ),
        ).pipe(
          map((photos) => ProductsActions.loadProductPhotosSuccess({ photos })),
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
      concatMap(({ id }) =>
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
      switchMap(({ id, data }) =>
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

  addProductPhoto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.addProductPhoto),
      concatMap(({ productId, data }) =>
        this.productsApi.addProductPhoto(productId, data).pipe(
          map((product) =>
            ProductsActions.addProductPhotoSuccess({
              productId: product.id,
              data,
              product,
              photosOrder: product.photosOrder,
            }),
          ),
          catchError(({ error }) =>
            of(
              ProductsActions.addProductPhotoFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    );
  });

  deleteProductPhoto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.deleteProductPhoto),
      concatMap(({ productId, photoId }) =>
        this.productsApi.deleteProductPhoto(productId, photoId).pipe(
          map((product) =>
            ProductsActions.deleteProductPhotoSuccess({
              productId,
              photoId,
              photosOrder: product.photosOrder,
            }),
          ),
          catchError(({ error }) =>
            of(
              ProductsActions.deleteProductPhotoFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
