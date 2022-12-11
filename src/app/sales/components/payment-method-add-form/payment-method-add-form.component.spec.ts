import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodAddFormComponent } from './payment-method-add-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { PaymentMethodsActions } from '../../store';
import { selectSettingsList } from '../../../settings/store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';

describe('PaymentMethodAddFormComponent', () => {
  let component: PaymentMethodAddFormComponent;
  let fixture: ComponentFixture<PaymentMethodAddFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [PaymentMethodAddFormComponent, FormatCurrencyPipe],
      providers: [
        provideMockStore({
          selectors: [
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

    fixture = TestBed.createComponent(PaymentMethodAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createPaymentMethod action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('name');
    await inputs[1].setValue('description');
    await inputs[2].setValue('10');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    const expected = cold('a', {
      a: PaymentMethodsActions.createPaymentMethod({
        data: {
          name: 'name',
          description: 'description',
          price: 10,
        },
      }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
