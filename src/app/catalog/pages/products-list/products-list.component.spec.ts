import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectProductsList } from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { BooleanTextPipe } from '../../../shared/pipes/boolean-text.pipe';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatTableModule,
      ],
      declarations: [
        ProductsListComponent,
        BooleanTextPipe,
        FormatCurrencyPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectProductsList,
              value: [
                {
                  id: 1,
                  name: 'Product 1',
                  price: 100,
                  description: 'Product 1 description',
                  photos: [],
                  stock: 10,
                  visible: true,
                } as any,
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

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', async () => {
    const table = await loader.getHarness(MatTableHarness);
    expect(table).toBeTruthy();
    const [row] = await table.getHeaderRows();
    expect(await row.getCellTextByIndex()).toEqual([
      'ID',
      'Photo',
      'Name',
      'Description',
      'Price',
      'Stock',
      'Visibility',
    ]);
  });

  it('should render product row', async () => {
    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      '',
      'Product 1',
      'Product 1 description',
      '€100.00',
      '10',
      'Visible',
    ]);
  });
});
