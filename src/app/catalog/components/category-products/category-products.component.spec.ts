import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsComponent } from './category-products.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { Category } from '../../../core/api';
import { CategoriesActions } from '../../store';
import { cold } from 'jasmine-marbles';
import { By } from '@angular/platform-browser';

describe('CategoryProductsComponent', () => {
  let component: CategoryProductsComponent;
  let fixture: ComponentFixture<CategoryProductsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDividerModule,
      ],
      declarations: [CategoryProductsComponent, ProductCardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryProductsComponent);
    component = fixture.componentInstance;
    component.category = {
      id: 1,
      name: 'Category 1',
      products: [
        {
          id: 1,
          name: 'Product 1',
        },
        {
          id: 2,
          name: 'Product 2',
        },
      ],
    } as Category;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore if category is not set', () => {
    component.category = null;
    fixture.detectChanges();

    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(products.length).toBe(0);
  });

  it('should render products', () => {
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(products.length).toBe(2);
    expect(products[0].nativeElement.textContent).toContain('Product 1');
    expect(products[1].nativeElement.textContent).toContain('Product 2');
  });

  it('should dispatch getCategoryProducts action', () => {
    fixture.detectChanges();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.getCategoryProducts({ id: 1 }),
      }),
    );
  });

  it('should dispatch delete category product action', () => {
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    products[1].triggerEventHandler('delete', 2);

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.deleteCategoryProduct({
          categoryId: 1,
          productId: 2,
        }),
      }),
    );
  });

  it('should ignore delete if category is not loaded', () => {
    component.category = null;
    fixture.detectChanges();

    component.deleteProduct(1);
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });
});
