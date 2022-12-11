import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderFormComponent } from './edit-order-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  OrdersActions,
  selectDeliveryMethodsList,
  selectPaymentMethodsList,
} from '../../store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Order } from '../../../core/api';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { cold } from 'jasmine-marbles';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('EditOrderFormComponent', () => {
  let component: EditOrderFormComponent;
  let fixture: ComponentFixture<EditOrderFormComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
      ],
      declarations: [EditOrderFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectDeliveryMethodsList,
              value: [
                {
                  id: 1,
                  name: 'delivery-test',
                },
              ],
            },
            {
              selector: selectPaymentMethodsList,
              value: [
                {
                  id: 1,
                  name: 'payment-test',
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditOrderFormComponent);
    component = fixture.componentInstance;
    component.order = {
      id: 1,
      status: 'pending',
      delivery: {
        deliveryStatus: 'pending',
        method: {
          id: 1,
          name: 'delivery-test',
        },
      },
      payment: {
        paymentStatus: 'pending',
        method: {
          id: 1,
          name: 'payment-test',
        },
      },
    } as Order;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateOrder action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('delivered');
    await inputs[1].setValue('completed');
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[0].clickOptions({ text: 'Refunded' });
    await selects[1].clickOptions({ text: 'delivery-test' });
    await selects[2].clickOptions({ text: 'payment-test' });

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: OrdersActions.updateOrder({
          orderId: 1,
          data: {
            status: 'refunded',
            delivery: {
              ...component.order?.delivery,
              deliveryStatus: 'delivered',
              methodId: 1,
            },
            payment: {
              paymentStatus: 'completed',
              methodId: 1,
            },
          } as any,
        }),
      }),
    );
  });

  it('should ignore if order is null', async () => {
    component.order = null;
    fixture.detectChanges();
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });
});
