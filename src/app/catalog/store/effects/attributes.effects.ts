import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttributesApiService } from '../../../core/api';
import { AttributesActions } from '../actions';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class AttributesEffects {
  constructor(
    private actions$: Actions,
    private attributesApi: AttributesApiService,
  ) {}

  getAttributeTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AttributesActions.getAttributeTypes),
      exhaustMap(() =>
        this.attributesApi.getAttributeTypes().pipe(
          map((attributeTypes) =>
            AttributesActions.getAttributeTypesSuccess({ attributeTypes }),
          ),
          catchError(({ error }) =>
            of(
              AttributesActions.getAttributeTypesFailure({
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
      ofType(AttributesActions.addAttributeType),
      concatMap(({ data }) =>
        this.attributesApi.createAttributeType(data).pipe(
          map((attributeType) =>
            AttributesActions.addAttributeTypeSuccess({ attributeType }),
          ),
          catchError(({ error }) =>
            of(
              AttributesActions.addAttributeTypeFailure({
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
      ofType(AttributesActions.updateAttributeType),
      concatMap(({ id, data }) =>
        this.attributesApi.updateAttributeType(id, data).pipe(
          map((attributeType) =>
            AttributesActions.updateAttributeTypeSuccess({ id, attributeType }),
          ),
          catchError(({ error }) =>
            of(
              AttributesActions.updateAttributeTypeFailure({
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
      ofType(AttributesActions.deleteAttributeType),
      mergeMap(({ id }) =>
        this.attributesApi.deleteAttributeType(id).pipe(
          map(() => AttributesActions.deleteAttributeTypeSuccess({ id })),
          catchError(({ error }) =>
            of(
              AttributesActions.deleteAttributeTypeFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });
}
