import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderFormComponent } from './create-order-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  OrdersActions,
  selectDeliveryMethodsList,
  selectNewOrderId,
  selectPaymentMethodsList,
  selectSalesLoading,
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
import { OrderItemsInputComponent } from '../../components/order-items-input/order-items-input.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTableModule } from '@angular/material/table';
import { selectProductsList } from '../../../catalog/store';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { FormatCountryPipe } from '../../../shared/pipes/format-country.pipe';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

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
        NgxMatSelectSearchModule,
        MatTableModule,
        NgxMatIntlTelInputComponent,
        HttpClientTestingModule,
        MatIconModule,
      ],
      declarations: [
        CreateOrderFormComponent,
        OrderItemsInputComponent,
        CountrySelectComponent,
        FormatCountryPipe,
        FormatCurrencyPipe,
      ],
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
            {
              selector: selectNewOrderId,
              value: 1,
            },
            {
              selector: selectSalesLoading,
              value: false,
            },
            {
              selector: selectProductsList,
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
    await inputs[1].setValue('+48123456789');
    await inputs[2].setValue('Test Test');
    await inputs[4].setValue('Test address');
    await inputs[5].setValue('Test city');
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[1].clickOptions({ text: 'delivery-test' });
    await selects[3].clickOptions({ text: 'payment-test' });
    await selects[2].clickOptions({ text: '🇵🇱 Poland (PL)' });

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await button.click();

    const expected = cold('a', {
      a: OrdersActions.createOrder({
        data: {
          contactEmail: 'test@test.local',
          contactPhone: '+48123456789',
          fullName: 'Test Test',
          message: undefined,
          delivery: {
            methodId: 1,
            address: 'Test address',
            city: 'Test city',
            country: 'PL',
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
