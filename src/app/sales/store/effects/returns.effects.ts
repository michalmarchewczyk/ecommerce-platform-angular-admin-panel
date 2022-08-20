import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReturnsApiService } from '../../../core/api';
import { ReturnsActions } from '../actions';
import { exhaustMap, map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class ReturnsEffects {
  constructor(
    private actions$: Actions,
    private returnsApi: ReturnsApiService,
  ) {}

  loadReturns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReturnsActions.loadReturns),
      exhaustMap(() =>
        this.returnsApi.getReturns().pipe(
          map((returns) => ReturnsActions.loadReturnsSuccess({ returns })),
          catchError(({ error }) =>
            of(ReturnsActions.loadReturnsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  getReturn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReturnsActions.getReturn),
      exhaustMap(({ returnId }) =>
        this.returnsApi.getReturn(returnId).pipe(
          map((data) => ReturnsActions.getReturnSuccess({ return: data })),
          catchError(({ error }) =>
            of(ReturnsActions.getReturnFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  createReturn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReturnsActions.createReturn),
      exhaustMap(({ data }) =>
        this.returnsApi.createReturn(data).pipe(
          map((newReturn) =>
            ReturnsActions.createReturnSuccess({ return: newReturn }),
          ),
          catchError(({ error }) =>
            of(ReturnsActions.createReturnFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateReturn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReturnsActions.updateReturn),
      exhaustMap(({ returnId, data }) =>
        this.returnsApi.updateReturn(returnId, data).pipe(
          map((updatedReturn) =>
            ReturnsActions.updateReturnSuccess({
              returnId,
              return: updatedReturn,
            }),
          ),
          catchError(({ error }) =>
            of(ReturnsActions.updateReturnFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });
}
