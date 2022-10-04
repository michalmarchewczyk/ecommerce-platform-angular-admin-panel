import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsComponent } from './order-items.component';
import { MatTableModule } from '@angular/material/table';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { SimpleChange } from '@angular/core';

describe('OrderItemsComponent', () => {
  let component: OrderItemsComponent;
  let fixture: ComponentFixture<OrderItemsComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [OrderItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsComponent);
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
      'Price',
      'Quantity',
      'Total',
    ]);
  });

  it('should render item row', async () => {
    component.order = {
      items: [
        {
          id: 1,
          product: {
            name: 'Product 1',
            id: 1,
            photos: [],
          },
          price: 100,
          quantity: 2,
        },
      ],
    } as any;
    component.ngOnChanges({
      order: new SimpleChange(null, component.order, false),
    });
    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      'Product 1',
      '100.00',
      '2',
      '200.00',
    ]);
  });
});
