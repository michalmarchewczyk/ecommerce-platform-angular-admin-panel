import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesComponent } from './product-attributes.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AttributeDto, Product } from '../../../core/api';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { cold } from 'jasmine-marbles';
import { ProductsActions } from '../../store';

describe('ProductAttributesComponent', () => {
  let component: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductAttributesComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAttributesComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Product 1',
      attributes: [
        {
          id: 1,
          value: 'Value 1',
          type: {
            id: 1,
            name: 'Type 1',
            valueType: 'string',
          },
        },
      ],
    } as Product;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update product attributes to save on change', async () => {
    component.product = {
      id: 1,
      name: 'Product 1',
      attributes: [
        {
          id: 2,
          value: 'Value 2',
          type: {
            id: 2,
            name: 'Type 2',
            valueType: 'string',
          },
        },
      ],
    } as Product;
    component.ngOnChanges({
      product: new SimpleChange(null, component.product, false),
    } as SimpleChanges);
    fixture.detectChanges();
    expect(component.attributesToSave).toEqual([
      {
        id: 2,
        value: 'Value 2',
        typeId: 2,
      },
    ]);
  });

  it('should ignore if product is not loaded', async () => {
    component.product = null;
    fixture.detectChanges();
    component.ngOnChanges({
      product: new SimpleChange(null, component.product, false),
    });
    expect(component.attributesToSave).toEqual([]);
  });

  it('should add attribute to save', async () => {
    component.onAdd({ id: 2, value: 'Value 2', typeId: 2 });
    fixture.detectChanges();
    expect(component.attributesToSave).toEqual([
      {
        id: 1,
        value: 'Value 1',
        typeId: 1,
      },
      {
        id: 2,
        value: 'Value 2',
        typeId: 2,
      },
    ]);
  });

  it('should update attribute to save', async () => {
    component.onUpdate(1, 'Value 1 updated');
    fixture.detectChanges();
    expect(component.attributesToSave).toEqual([
      {
        id: 1,
        value: 'Value 1 updated',
        typeId: 1,
      },
    ]);
  });

  it('should delete attribute to save', async () => {
    component.onDelete(1);
    fixture.detectChanges();
    expect(component.attributesToSave).toEqual([]);
  });

  it('should dispatch updateProductAttributes action', async () => {
    component.saveAttributes();
    fixture.detectChanges();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: ProductsActions.updateProductAttributes({
          id: 1,
          data: [{ value: 'Value 1', typeId: 1, id: 1 } as AttributeDto],
        }),
      }),
    );
  });

  it('should ignore save if product is not loaded', async () => {
    component.product = null;
    component.saveAttributes();
    fixture.detectChanges();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });
});
