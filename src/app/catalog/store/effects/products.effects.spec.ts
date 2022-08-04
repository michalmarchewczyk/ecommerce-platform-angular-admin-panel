import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { ProductsEffects } from './products.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsActions } from '../actions';
import { Product } from '../../../core/api';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ProductsEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadProducts$', () => {
    it('should return a loadProductsSuccess action', (done) => {
      actions$ = of(ProductsActions.loadProducts());

      effects.loadProducts$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.loadProductsSuccess({ products: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a loadProductsFailure action', (done) => {
      actions$ = of(ProductsActions.loadProducts());

      effects.loadProducts$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.loadProductsFailure({ error: 'error' }),
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

  describe('addProduct$', () => {
    it('should return a addProductSuccess action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(ProductsActions.addProduct({ data: product }));

      effects.addProduct$.subscribe((result) => {
        expect(result).toEqual(ProductsActions.addProductSuccess({ product }));
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(product);
    });

    it('should return a addProductFailure action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(ProductsActions.addProduct({ data: product }));

      effects.addProduct$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.addProductFailure({ error: 'error' }),
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

  describe('updateProduct$', () => {
    it('should return a updateProductSuccess action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(ProductsActions.updateProduct({ id: 1, data: product }));

      effects.updateProduct$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.updateProductSuccess({ id: 1, product }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PATCH' }).flush(product);
    });

    it('should return a updateProductFailure action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(ProductsActions.updateProduct({ id: 1, data: product }));

      effects.updateProduct$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.updateProductFailure({ error: 'error' }),
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

  describe('deleteProduct$', () => {
    it('should return a deleteProductSuccess action', (done) => {
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      effects.deleteProduct$.subscribe((result) => {
        expect(result).toEqual(ProductsActions.deleteProductSuccess({ id: 1 }));
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush({});
    });

    it('should return a deleteProductFailure action', (done) => {
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      effects.deleteProduct$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.deleteProductFailure({ error: 'error' }),
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

  describe('updateProductAttributes$', () => {
    it('should return a updateProductAttributesSuccess action', (done) => {
      const product = {
        id: 1,
        name: 'Product 1',
      } as Product;
      actions$ = of(
        ProductsActions.updateProductAttributes({
          id: 1,
          data: [
            {
              value: 'value',
              typeId: 1,
            },
          ],
        }),
      );

      effects.updateProductAttributes$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.updateProductAttributesSuccess({
            id: 1,
            attributes: [],
          }),
        );
        done();
      });

      httpTestingController
        .expectOne({ method: 'PATCH' })
        .flush({ ...product, attributes: [] });
    });

    it('should return a updateProductAttributesFailure action', (done) => {
      actions$ = of(
        ProductsActions.updateProductAttributes({
          id: 1,
          data: [
            {
              value: 'value',
              typeId: 1,
            },
          ],
        }),
      );

      effects.updateProductAttributes$.subscribe((result) => {
        expect(result).toEqual(
          ProductsActions.updateProductAttributesFailure({ error: 'error' }),
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
});
