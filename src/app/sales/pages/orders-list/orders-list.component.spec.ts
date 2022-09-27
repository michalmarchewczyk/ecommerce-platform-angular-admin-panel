import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListComponent } from './orders-list.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { selectOrdersListWithItems } from '../../store';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
      ],
      declarations: [OrdersListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectOrdersListWithItems,
              value: [
                {
                  id: 1,
                  created: '2022-08-21T16:21:38.277Z',
                  status: 'pending',
                  fullName: 'Test Test',
                  contactEmail: 'test@test.local',
                  contactPhone: '123456789',
                  items: [
                    {
                      id: 1,
                      quantity: 2,
                      price: 2,
                    },
                  ],
                  itemsCount: 2,
                  itemsTotal: 4,
                  payment: {
                    method: {
                      name: 'payment-test',
                    },
                  },
                  delivery: {
                    method: {
                      name: 'delivery-test',
                    },
                  },
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersListComponent);
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
      'Items',
      'Total price',
      'Full name',
      'Delivery',
      'Payment',
    ]);
  });

  it('should render order row', async () => {
    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      new DatePipe('en-US').transform(
        '2022-08-21T16:21:38.277Z',
        'd MMM yyyy, HH:mm',
      ) ?? '',
      'pending',
      '2',
      '4.00',
      'Test Test',
      'delivery-test',
      'payment-test',
    ]);
  });
});
