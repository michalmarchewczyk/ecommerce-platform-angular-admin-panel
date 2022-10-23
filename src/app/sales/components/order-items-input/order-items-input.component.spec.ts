import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsInputComponent } from './order-items-input.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { selectProductsList } from '../../../catalog/store';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../core/api';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatRowHarness } from '@angular/material/table/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { selectSettingsList } from '../../../settings/store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';

describe('OrderItemsInputComponent', () => {
  let component: OrderItemsInputComponent;
  let fixture: ComponentFixture<OrderItemsInputComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        NgxMatSelectSearchModule,
        MatInputModule,
      ],
      declarations: [OrderItemsInputComponent, FormatCurrencyPipe],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectProductsList,
              value: [
                { id: 1, name: 'Product 1', price: 10, stock: 1 },
                { id: 2, name: 'Product 2', price: 20, stock: 2 },
              ],
            },
            {
              selector: selectSettingsList,
              value: [
                {
                  id: 1,
                  name: 'Currency',
                  value: 'EUR',
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter if search is set', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
          price: 10,
          stock: 1,
        } as Product,
      ]);
    });

    component.productsFilter.setValue('1');
    fixture.detectChanges();
  });

  it('should not filter if search is empty', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 1,
          name: 'Product 1',
          price: 10,
          stock: 1,
        } as Product,
        {
          id: 2,
          name: 'Product 2',
          price: 20,
          stock: 2,
        } as Product,
      ]);
    });

    component.productsFilter.setValue('');
    fixture.detectChanges();
  });

  it('should filter out already added products', async () => {
    component.filteredProducts$.subscribe((products) => {
      expect(products).toEqual([
        {
          id: 2,
          name: 'Product 2',
          price: 20,
          stock: 2,
        } as Product,
      ]);
    });

    component.items = [
      {
        productId: 1,
        quantity: 1,
      },
    ];

    component.productsFilter.setValue('');
    fixture.detectChanges();
  });

  it('should add item', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    await select.clickOptions({ text: '#1 Product 1 (stock: 1) - €10.00' });
    fixture.detectChanges();

    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      'Product 1',
      '€10.00',
      'Quantity',
      '€10.00',
      'delete',
    ]);
  });

  it('should not add item if already added', async () => {
    component.items = [
      {
        productId: 1,
        quantity: 2,
      },
    ];
    fixture.detectChanges();

    await component.addProduct(1);
    fixture.detectChanges();

    expect(component.items).toEqual([
      {
        productId: 1,
        quantity: 2,
      },
    ]);
  });

  it('should delete item', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    await select.clickOptions({ text: '#1 Product 1 (stock: 1) - €10.00' });
    fixture.detectChanges();

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'delete' }),
    );
    await button.click();
    fixture.detectChanges();

    expect(component.items).toEqual([]);
  });

  it('should update item quantity', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    await select.clickOptions({ text: '#1 Product 1 (stock: 1) - €10.00' });
    fixture.detectChanges();

    await component.updateQuantity({
      product: { id: 1, name: 'Product 1', price: 10, stock: 1 } as Product,
      quantity: 5,
    });

    expect(component.items).toEqual([
      {
        productId: 1,
        quantity: 5,
      },
    ]);
  });
});
