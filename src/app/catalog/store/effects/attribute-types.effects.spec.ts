import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AttributeTypesEffects } from './attribute-types.effects';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AttributeTypesActions } from '../actions';
import { AttributeType } from '../../../core/api';

describe('AttributeTypesEffects', () => {
  let actions$: Observable<any>;
  let effects: AttributeTypesEffects;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AttributeTypesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(AttributeTypesEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAttributeTypes$', () => {
    it('should return a getAttributeTypesSuccess action', (done) => {
      actions$ = of(AttributeTypesActions.getAttributeTypes());

      effects.getAttributeTypes$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.getAttributeTypesSuccess({
            attributeTypes: [],
          }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'GET' }).flush([]);
    });

    it('should return a getAttributeTypesFailure action', (done) => {
      actions$ = of(AttributeTypesActions.getAttributeTypes());

      effects.getAttributeTypes$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.getAttributeTypesFailure({ error: 'error' }),
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
        AttributeTypesActions.addAttributeType({ data: attributeType }),
      );

      effects.addAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.addAttributeTypeSuccess({ attributeType }),
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
        AttributeTypesActions.addAttributeType({ data: attributeType }),
      );

      effects.addAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.addAttributeTypeFailure({ error: 'error' }),
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
        AttributeTypesActions.updateAttributeType({
          id: 1,
          data: attributeType,
        }),
      );

      effects.updateAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.updateAttributeTypeSuccess({
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
        AttributeTypesActions.updateAttributeType({
          id: 1,
          data: attributeType,
        }),
      );

      effects.updateAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.updateAttributeTypeFailure({ error: 'error' }),
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
      actions$ = of(AttributeTypesActions.deleteAttributeType({ id: 1 }));

      effects.deleteAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.deleteAttributeTypeSuccess({ id: 1 }),
        );
        done();
      });

      httpTestingController.expectOne({ method: 'DELETE' }).flush(null);
    });

    it('should return a deleteAttributeTypeFailure action', (done) => {
      actions$ = of(AttributeTypesActions.deleteAttributeType({ id: 1 }));

      effects.deleteAttributeType$.subscribe((result) => {
        expect(result).toEqual(
          AttributeTypesActions.deleteAttributeTypeFailure({ error: 'error' }),
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
