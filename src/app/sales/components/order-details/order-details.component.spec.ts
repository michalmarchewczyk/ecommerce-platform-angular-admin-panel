import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { ReturnAddDialogComponent } from '../return-add-dialog/return-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { selectOrdersListWithItems, selectReturnsList } from '../../store';
import { Router } from '@angular/router';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;
  let loader: HarnessLoader;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [
        OrderDetailsComponent,
        ReturnAddDialogComponent,
        FormatCurrencyPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
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

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    component.order = {
      id: 1,
      status: 'open',
      return: null,
      delivery: {
        deliveryStatus: 'pending',
        method: {
          name: 'test',
          price: 0,
        },
      },
      payment: {
        paymentStatus: 'pending',
        method: {
          name: 'test',
          price: 0,
        },
      },
      items: [],
    } as any;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open return add dialog', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Add return' }),
    );
    await button.click();

    const navigateSpy = spyOn(router, 'navigate');

    const dialog = await loader.getHarness(MatDialogHarness);
    expect(dialog).toBeTruthy();
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await dialogButton.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/sales/returns']);
  });
});
