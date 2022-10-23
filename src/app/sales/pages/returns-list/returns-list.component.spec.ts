import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsListComponent } from './returns-list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import {
  selectOrdersListWithItems,
  selectReturnsList,
  selectReturnsListWithItems,
} from '../../store';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReturnAddDialogComponent } from '../../components/return-add-dialog/return-add-dialog.component';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

describe('ReturnsListComponent', () => {
  let component: ReturnsListComponent;
  let fixture: ComponentFixture<ReturnsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatCardModule,
        NoopAnimationsModule,
        MatDialogModule,
      ],
      declarations: [
        ReturnsListComponent,
        ReturnAddDialogComponent,
        FormatCurrencyPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectReturnsListWithItems,
              value: [
                {
                  id: 1,
                  status: 'open',
                  order: {
                    id: 2,
                  },
                  itemsCount: 3,
                  itemsTotal: 6,
                },
              ],
            },
            {
              selector: selectOrdersListWithItems,
              value: [],
            },
            {
              selector: selectReturnsList,
              value: [],
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

    fixture = TestBed.createComponent(ReturnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
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
      'Created',
      'Status',
      'Order ID',
      'Order Created',
      'Quantity',
      'Total',
      '',
    ]);
  });

  it('should render return row', async () => {
    const [row, expandRow] = await loader.getAllHarnesses(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      '',
      'open',
      '2',
      '',
      '3',
      '€6.00',
      'keyboard_arrow_down',
    ]);
    expect(expandRow).toBeTruthy();
  });

  it('should open return add dialog', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'add' }),
    );
    await button.click();

    const dialog = await loader.getHarness(MatDialogHarness);
    expect(dialog).toBeTruthy();
  });
});
