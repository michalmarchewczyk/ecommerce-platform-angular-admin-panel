import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { CategoriesEffects } from './categories.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoriesActions } from '../actions';
import { Category, Product } from '../../../core/api';

describe('CategoriesEffects', () => {
  let actions$: Observable<any>;
  let effects: CategoriesEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(CategoriesEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCategories$', () => {
    it('should return a loadCategoriesSuccess action', (done) => {
      actions$ = of(CategoriesActions.loadCategories());

      effects.loadCategories$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.loadCategoriesSuccess({ categories: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadCategoriesFailure action', (done) => {
      actions$ = of(CategoriesActions.loadCategories());

      effects.loadCategories$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.loadCategoriesFailure({ error: 'error' }),
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

  describe('loadCategoryGroups$', () => {
    it('should return a loadCategoryGroupsSuccess action', (done) => {
      actions$ = of(CategoriesActions.loadCategoryGroups());

      effects.loadCategoryGroups$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.loadCategoryGroupsSuccess({ categoryGroups: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadCategoryGroupsFailure action', (done) => {
      actions$ = of(CategoriesActions.loadCategoryGroups());

      effects.loadCategoryGroups$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.loadCategoryGroupsFailure({ error: 'error' }),
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

  describe('addCategory$', () => {
    it('should return a addCategorySuccess action', (done) => {
      const category = {
        id: 1,
        name: 'Category 1',
      } as Category;
      actions$ = of(CategoriesActions.addCategory({ data: category }));

      effects.addCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.addCategorySuccess({ category }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(category);
    });

    it('should return a addCategoryFailure action', (done) => {
      const category = {
        id: 1,
        name: 'Category 1',
      } as Category;
      actions$ = of(CategoriesActions.addCategory({ data: category }));

      effects.addCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.addCategoryFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(
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

  describe('updateCategory$', () => {
    it('should return a updateCategorySuccess action', (done) => {
      const category = {
        id: 1,
        name: 'Category 1',
      } as Category;
      actions$ = of(
        CategoriesActions.updateCategory({ id: 1, data: category }),
      );

      effects.updateCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.updateCategorySuccess({ id: 1, category }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PATCH' }).flush(category);
    });

    it('should return a updateCategoryFailure action', (done) => {
      const category = {
        id: 1,
        name: 'Category 1',
      } as Category;
      actions$ = of(
        CategoriesActions.updateCategory({ id: 1, data: category }),
      );

      effects.updateCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.updateCategoryFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PATCH' }).flush(
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

  describe('deleteCategory$', () => {
    it('should return a deleteCategorySuccess action', (done) => {
      actions$ = of(CategoriesActions.deleteCategory({ id: 1 }));

      effects.deleteCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.deleteCategorySuccess({ id: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(null);
    });

    it('should return a deleteCategoryFailure action', (done) => {
      actions$ = of(CategoriesActions.deleteCategory({ id: 1 }));

      effects.deleteCategory$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.deleteCategoryFailure({ error: 'error' }),
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

  describe('getCategoryProducts$', () => {
    it('should return a getCategoryProductsSuccess action', (done) => {
      actions$ = of(CategoriesActions.getCategoryProducts({ id: 1 }));

      effects.getCategoryProducts$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.getCategoryProductsSuccess({
            categoryId: 1,
            products: [],
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a getCategoryProductsFailure action', (done) => {
      actions$ = of(CategoriesActions.getCategoryProducts({ id: 1 }));

      effects.getCategoryProducts$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.getCategoryProductsFailure({ error: 'error' }),
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

  describe('addCategoryProduct$', () => {
    it('should return a addCategoryProductSuccess action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(
        CategoriesActions.addCategoryProduct({ categoryId: 1, productId: 1 }),
      );

      effects.addCategoryProduct$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.addCategoryProductSuccess({
            categoryId: 1,
            product: product,
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(product);
    });

    it('should return a addCategoryProductFailure action', (done) => {
      actions$ = of(
        CategoriesActions.addCategoryProduct({ categoryId: 1, productId: 1 }),
      );

      effects.addCategoryProduct$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.addCategoryProductFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(
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

  describe('deleteCategoryProduct$', () => {
    it('should return a deleteCategoryProductSuccess action', (done) => {
      actions$ = of(
        CategoriesActions.deleteCategoryProduct({
          categoryId: 1,
          productId: 1,
        }),
      );

      effects.deleteCategoryProduct$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.deleteCategoryProductSuccess({
            categoryId: 1,
            productId: 1,
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(null);
    });

    it('should return a deleteCategoryProductFailure action', (done) => {
      actions$ = of(
        CategoriesActions.deleteCategoryProduct({
          categoryId: 1,
          productId: 1,
        }),
      );

      effects.deleteCategoryProduct$.subscribe((result) => {
        expect(result).toEqual(
          CategoriesActions.deleteCategoryProductFailure({ error: 'error' }),
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
