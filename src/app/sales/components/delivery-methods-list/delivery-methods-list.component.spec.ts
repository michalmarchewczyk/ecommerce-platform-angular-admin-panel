import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodsListComponent } from './delivery-methods-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectDeliveryMethodsList } from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { selectSettingsList } from '../../../settings/store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';

describe('DeliveryMethodsListComponent', () => {
  let component: DeliveryMethodsListComponent;
  let fixture: ComponentFixture<DeliveryMethodsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      declarations: [DeliveryMethodsListComponent, FormatCurrencyPipe],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectDeliveryMethodsList,
              value: [
                {
                  id: 1,
                  name: 'Method 1',
                  description: 'Description 1',
                  price: 10,
                },
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

    fixture = TestBed.createComponent(DeliveryMethodsListComponent);
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
      'Name',
      'Description',
      'Price',
      '',
    ]);
  });

  it('should render delivery method row', async () => {
    const [row, expandRow] = await loader.getAllHarnesses(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      'Method 1',
      'Description 1',
      '€10.00',
      'keyboard_arrow_down',
    ]);
    expect(expandRow).toBeTruthy();
  });
});
