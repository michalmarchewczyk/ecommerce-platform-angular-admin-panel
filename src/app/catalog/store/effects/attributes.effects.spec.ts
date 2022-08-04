import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AttributesEffects } from './attributes.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AttributesActions } from '../actions';
import { AttributeType } from '../../../core/api';

describe('AttributesEffects', () => {
  let actions$: Observable<any>;
  let effects: AttributesEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AttributesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(AttributesEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAttributeTypes$', () => {
    it('should return a getAttributeTypesSuccess action', (done) => {
      actions$ = of(AttributesActions.getAttributeTypes());

      effects.getAttributeTypes$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.getAttributeTypesSuccess({ attributeTypes: [] }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a getAttributeTypesFailure action', (done) => {
      actions$ = of(AttributesActions.getAttributeTypes());

      effects.getAttributeTypes$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.getAttributeTypesFailure({ error: 'error' }),
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

  describe('addAttributeType$', () => {
    it('should return a addAttributeTypeSuccess action', (done) => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      actions$ = of(
        AttributesActions.addAttributeType({ data: attributeType }),
      );

      effects.addAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.addAttributeTypeSuccess({ attributeType }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(attributeType);
    });

    it('should return a addAttributeTypeFailure action', (done) => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      actions$ = of(
        AttributesActions.addAttributeType({ data: attributeType }),
      );

      effects.addAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.addAttributeTypeFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'POST' }).flush(
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

  describe('updateAttributeType$', () => {
    it('should return a updateAttributeTypeSuccess action', (done) => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      actions$ = of(
        AttributesActions.updateAttributeType({ id: 1, data: attributeType }),
      );

      effects.updateAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.updateAttributeTypeSuccess({
            id: 1,
            attributeType,
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PUT' }).flush(attributeType);
    });

    it('should return a updateAttributeTypeFailure action', (done) => {
      const attributeType = {
        id: 1,
        name: 'Attribute Type 1',
      } as AttributeType;
      actions$ = of(
        AttributesActions.updateAttributeType({ id: 1, data: attributeType }),
      );

      effects.updateAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.updateAttributeTypeFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'PUT' }).flush(
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

  describe('deleteAttributeType$', () => {
    it('should return a deleteAttributeTypeSuccess action', (done) => {
      actions$ = of(AttributesActions.deleteAttributeType({ id: 1 }));

      effects.deleteAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.deleteAttributeTypeSuccess({ id: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(null);
    });

    it('should return a deleteAttributeTypeFailure action', (done) => {
      actions$ = of(AttributesActions.deleteAttributeType({ id: 1 }));

      effects.deleteAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributesActions.deleteAttributeTypeFailure({ error: 'error' }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(
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
});
