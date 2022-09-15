import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsListComponent } from './returns-list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { selectReturnsListWithItems } from '../../store';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReturnsListComponent', () => {
  let component: ReturnsListComponent;
  let fixture: ComponentFixture<ReturnsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatCardModule, NoopAnimationsModule],
      declarations: [ReturnsListComponent],
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
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnsListComponent);
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
      '6',
      'keyboard_arrow_down',
    ]);
    expect(expandRow).toBeTruthy();
  });
});
