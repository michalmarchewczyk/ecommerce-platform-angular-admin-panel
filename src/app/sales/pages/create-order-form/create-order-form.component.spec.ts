import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderFormComponent } from './create-order-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  OrdersActions,
  selectDeliveriesList,
  selectNewOrderId,
  selectPaymentsList,
} from '../../store';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { cold } from 'jasmine-marbles';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateOrderFormComponent', () => {
  let component: CreateOrderFormComponent;
  let fixture: ComponentFixture<CreateOrderFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatSelectModule,
        RouterTestingModule,
      ],
      declarations: [CreateOrderFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectDeliveriesList,
              value: [
                {
                  id: 1,
                  name: 'delivery-test',
                },
              ],
            },
            {
              selector: selectPaymentsList,
              value: [
                {
                  id: 1,
                  name: 'payment-test',
                },
              ],
            },
            {
              selector: selectNewOrderId,
              value: 1,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createOrder action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('test@test.local');
    await inputs[1].setValue('+48 123456789');
    await inputs[2].setValue('Test Test');
    await inputs[4].setValue('Test address');
    await inputs[5].setValue('Test city');
    await inputs[7].setValue('Test country');
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[0].clickOptions({ text: 'delivery-test' });
    await selects[1].clickOptions({ text: 'payment-test' });

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await button.click();

    const expected = cold('a', {
      a: OrdersActions.createOrder({
        data: {
          contactEmail: 'test@test.local',
          contactPhone: '+48 123456789',
          fullName: 'Test Test',
          message: undefined,
          delivery: {
            methodId: 1,
            address: 'Test address',
            city: 'Test city',
            country: 'Test country',
            postalCode: undefined,
          },
          payment: {
            methodId: 1,
          },
          items: [],
        },
      }),
    });

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
