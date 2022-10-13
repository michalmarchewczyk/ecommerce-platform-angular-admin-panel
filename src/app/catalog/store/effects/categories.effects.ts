import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesApiService } from '../../../core/api';
import { CategoriesActions } from '../actions';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesApi: CategoriesApiService,
  ) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      exhaustMap(() =>
        this.categoriesApi.getCategories().pipe(
          map((categories) =>
            CategoriesActions.loadCategoriesSuccess({ categories }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.loadCategoriesFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    );
  });

  loadCategoryGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CategoriesActions.loadCategoryGroups,
        CategoriesActions.loadCategoriesSuccess,
        CategoriesActions.updateCategorySuccess,
      ),
      exhaustMap(() =>
        this.categoriesApi.getCategoryGroups().pipe(
          map((categoryGroups) =>
            CategoriesActions.loadCategoryGroupsSuccess({ categoryGroups }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.loadCategoryGroupsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.addCategory),
      concatMap(({ data }) =>
        this.categoriesApi.createCategory(data).pipe(
          map((category) => CategoriesActions.addCategorySuccess({ category })),
          catchError(({ error }) =>
            of(CategoriesActions.addCategoryFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      concatMap(({ id, data }) =>
        this.categoriesApi.updateCategory(id, data).pipe(
          map((category) =>
            CategoriesActions.updateCategorySuccess({ id, category }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.updateCategoryFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      mergeMap(({ id }) =>
        this.categoriesApi.deleteCategory(id).pipe(
          map(() => CategoriesActions.deleteCategorySuccess({ id })),
          catchError(({ error }) =>
            of(
              CategoriesActions.deleteCategoryFailure({ error: error.message }),
            ),
          ),
        ),
      ),
    );
  });

  getCategoryProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.getCategoryProducts),
      exhaustMap(({ id }) =>
        this.categoriesApi.getCategoryProducts(id).pipe(
          map((products) =>
            CategoriesActions.getCategoryProductsSuccess({
              categoryId: id,
              products,
            }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.getCategoryProductsFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  addCategoryProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.addCategoryProduct),
      concatMap(({ categoryId, productId }) =>
        this.categoriesApi.addCategoryProduct(categoryId, { productId }).pipe(
          map((product) =>
            CategoriesActions.addCategoryProductSuccess({
              categoryId,
              product,
            }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.addCategoryProductFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteCategoryProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoriesActions.deleteCategoryProduct),
      mergeMap(({ categoryId, productId }) =>
        this.categoriesApi.deleteCategoryProduct(categoryId, productId).pipe(
          map(() =>
            CategoriesActions.deleteCategoryProductSuccess({
              categoryId,
              productId,
            }),
          ),
          catchError(({ error }) =>
            of(
              CategoriesActions.deleteCategoryProductFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
