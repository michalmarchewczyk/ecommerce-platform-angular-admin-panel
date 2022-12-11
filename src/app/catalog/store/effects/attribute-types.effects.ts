import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttributeTypesApiService } from '../../../core/api';
import { AttributeTypesActions } from '../actions';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class AttributeTypesEffects {
  constructor(
    private actions$: Actions,
    private attributeTypesApi: AttributeTypesApiService,
  ) {}

  getAttributeTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttributeTypesActions.getAttributeTypes),
      exhaustMap(() =>
        this.attributeTypesApi.getAttributeTypes().pipe(
          map((attributeTypes) =>
            AttributeTypesActions.getAttributeTypesSuccess({ attributeTypes }),
          ),
          catchError(({ error }) =>
            of(
              AttributeTypesActions.getAttributeTypesFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  addAttributeType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttributeTypesActions.addAttributeType),
      concatMap(({ data }) =>
        this.attributeTypesApi.createAttributeType(data).pipe(
          map((attributeType) =>
            AttributeTypesActions.addAttributeTypeSuccess({ attributeType }),
          ),
          catchError(({ error }) =>
            of(
              AttributeTypesActions.addAttributeTypeFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateAttributeType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttributeTypesActions.updateAttributeType),
      concatMap(({ id, data }) =>
        this.attributeTypesApi.updateAttributeType(id, data).pipe(
          map((attributeType) =>
            AttributeTypesActions.updateAttributeTypeSuccess({
              id,
              attributeType,
            }),
          ),
          catchError(({ error }) =>
            of(
              AttributeTypesActions.updateAttributeTypeFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteAttributeType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttributeTypesActions.deleteAttributeType),
      mergeMap(({ id }) =>
        this.attributeTypesApi.deleteAttributeType(id).pipe(
          map(() => AttributeTypesActions.deleteAttributeTypeSuccess({ id })),
          catchError(({ error }) =>
            of(
              AttributeTypesActions.deleteAttributeTypeFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
