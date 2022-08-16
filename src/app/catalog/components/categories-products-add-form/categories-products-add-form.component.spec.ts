import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesProductsAddFormComponent } from './categories-products-add-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CategoriesActions, selectProductsList } from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { cold } from 'jasmine-marbles';
import { Category, Product } from '../../../core/api';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('CategoriesProductsAddFormComponent', () => {
  let component: CategoriesProductsAddFormComponent;
  let fixture: ComponentFixture<CategoriesProductsAddFormComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [CategoriesProductsAddFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectProductsList,
              value: [
                {
                  id: 1,
                  name: 'Product 1',
                } as Product,
                {
                  id: 2,
                  name: 'Product 2',
                } as Product,
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesProductsAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not filter if search not set', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
        } as Product,
        {
          id: 2,
          name: 'Product 2',
        } as Product,
      ]);
    });

    component.productsFilter.setValue('');
    fixture.detectChanges();
  });

  it('should filter out category products', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 2,
          name: 'Product 2',
        } as Product,
      ]);
    });

    component.category = {
      id: 1,
      name: 'Category 1',
      products: [
        {
          id: 1,
          name: 'Product 1',
        } as Product,
      ],
    } as Category;

    component.productsFilter.setValue('');
    fixture.detectChanges();
  });

  it('should filter if search is set', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
        } as Product,
      ]);
    });

    component.productsFilter.setValue('1');
    fixture.detectChanges();
  });

  it('should add product to category', async () => {
    component.category = {
      id: 1,
      name: 'Category 1',
      products: [],
    } as any;
    component.productsFilter.setValue('');
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Product 1' });
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    fixture.detectChanges();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.addCategoryProduct({
          categoryId: 1,
          productId: 1,
        }),
      }),
    );
  });

  it('should ignore add if category is not loaded', async () => {
    component.category = null;
    component.productsFilter.setValue('');
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Product 1' });
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    fixture.detectChanges();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: { type: '@ngrx/store/init' },
      }),
    );
  });
});
