import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { PagesEffects } from './pages.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PagesActions } from '../actions';

describe('PagesEffects', () => {
  let actions$: Observable<any>;
  let effects: PagesEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PagesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PagesEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadPages$', () => {
    it('should return a loadPagesSuccess action', (done) => {
      actions$ = of(PagesActions.loadPages());

      effects.loadPages$.subscribe((result) => {
        expect(result).toEqual(PagesActions.loadPagesSuccess({ pages: [] }));
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadPagesFailure action', (done) => {
      actions$ = of(PagesActions.loadPages());

      effects.loadPages$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.loadPagesFailure({ error: 'error' }),
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

  describe('loadPageGroups$', () => {
    it('should return a loadPageGroupsSuccess action', (done) => {
      actions$ = of(PagesActions.loadPageGroups());

      effects.loadPageGroups$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.loadPageGroupsSuccess({ pageGroups: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadPageGroupsFailure action', (done) => {
      actions$ = of(PagesActions.loadPageGroups());

      effects.loadPageGroups$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.loadPageGroupsFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush(
        {
          message: 'error',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      );
    });
  });

  describe('createPage$', () => {
    it('should return a createPageSuccess action', (done) => {
      actions$ = of(
        PagesActions.createPage({
          data: { title: 'test', content: 'test' } as any,
        }),
      );

      effects.createPage$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.createPageSuccess({
            page: { title: 'test', content: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush({ title: 'test', content: 'test' });
    });

    it('should return a createPageFailure action', (done) => {
      actions$ = of(
        PagesActions.createPage({
          data: { title: 'test', content: 'test' } as any,
        }),
      );

      effects.createPage$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.createPageFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'POST' })
        .flush(
          { message: 'error' },
          { status: 400, statusText: 'Bad Request' },
        );
    });
  });

  describe('updatePage$', () => {
    it('should return a updatePageSuccess action', (done) => {
      actions$ = of(
        PagesActions.updatePage({
          pageId: 1,
          data: { content: 'test' } as any,
        }),
      );

      effects.updatePage$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.updatePageSuccess({
            pageId: 1,
            page: { id: 1, title: 'test', content: 'test' } as any,
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush({ id: 1, title: 'test', content: 'test' });
    });

    it('should return a updatePageFailure action', (done) => {
      actions$ = of(
        PagesActions.updatePage({
          pageId: 1,
          data: { content: 'test' } as any,
        }),
      );

      effects.updatePage$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.updatePageFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush(
          { message: 'error' },
          { status: 400, statusText: 'Bad Request' },
        );
    });
  });

  describe('deletePage$', () => {
    it('should return a deletePageSuccess action', (done) => {
      actions$ = of(PagesActions.deletePage({ pageId: 1 }));

      effects.deletePage$.subscribe((result) => {
        expect(result).toEqual(PagesActions.deletePageSuccess({ pageId: 1 }));
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deletePageFailure action', (done) => {
      actions$ = of(PagesActions.deletePage({ pageId: 1 }));

      effects.deletePage$.subscribe((result) => {
        expect(result).toEqual(
          PagesActions.deletePageFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'DELETE' })
        .flush({ message: 'error' }, { status: 404, statusText: 'Not Found' });
    });
  });
});
