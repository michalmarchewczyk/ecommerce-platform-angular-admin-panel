import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PagesApiService } from '../../../core/api';
import { PagesActions } from '../actions';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class PagesEffects {
  constructor(private actions$: Actions, private pagesApi: PagesApiService) {}

  loadPages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.loadPages),
      switchMap(() =>
        this.pagesApi.getPages().pipe(
          map((pages) => PagesActions.loadPagesSuccess({ pages })),
          catchError(({ error }) =>
            of(PagesActions.loadPagesFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  loadPageGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        PagesActions.loadPageGroups,
        PagesActions.loadPagesSuccess,
        PagesActions.updatePageSuccess,
      ),
      switchMap(() =>
        this.pagesApi.getPageGroups().pipe(
          map((pageGroups) =>
            PagesActions.loadPageGroupsSuccess({ pageGroups }),
          ),
          catchError(({ error }) =>
            of(PagesActions.loadPageGroupsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  createPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.createPage),
      switchMap(({ data }) =>
        this.pagesApi.createPage(data).pipe(
          map((page) => PagesActions.createPageSuccess({ page })),
          catchError(({ error }) =>
            of(PagesActions.createPageFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updatePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.updatePage),
      switchMap(({ pageId, data }) =>
        this.pagesApi.updatePage(pageId, data).pipe(
          map((page) => PagesActions.updatePageSuccess({ pageId, page })),
          catchError(({ error }) =>
            of(PagesActions.updatePageFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  deletePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PagesActions.deletePage),
      switchMap(({ pageId }) =>
        this.pagesApi.deletePage(pageId).pipe(
          map(() => PagesActions.deletePageSuccess({ pageId })),
          catchError(({ error }) =>
            of(PagesActions.deletePageFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });
}
