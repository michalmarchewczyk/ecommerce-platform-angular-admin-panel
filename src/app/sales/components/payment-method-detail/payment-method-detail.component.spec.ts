import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodDetailComponent } from './payment-method-detail.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { PaymentMethodsActions } from '../../store';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

describe('PaymentMethodDetailComponent', () => {
  let component: PaymentMethodDetailComponent;
  let fixture: ComponentFixture<PaymentMethodDetailComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        PaymentMethodDetailComponent,
        ConfirmDialogComponent,
        FormatCurrencyPipe,
      ],
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

    fixture = TestBed.createComponent(PaymentMethodDetailComponent);
    component = fixture.componentInstance;
    component.paymentMethod = {
      id: 1,
      name: 'Method 1',
      description: 'Description 1',
      price: 10,
    };
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input values', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(3);
    expect(await inputs[0].getValue()).toBe('Method 1');
    expect(await inputs[1].getValue()).toBe('Description 1');
    expect(await inputs[2].getValue()).toBe('10');
  });

  it('should dispatch updatePaymentMethod action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Method 1 updated');
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();
    const expected = cold('a', {
      a: PaymentMethodsActions.updatePaymentMethod({
        methodId: 1,
        data: {
          name: 'Method 1 updated',
          description: 'Description 1',
          price: 10,
        },
      }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch deletePaymentMethod action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();
    const expected = cold('a', {
      a: PaymentMethodsActions.deletePaymentMethod({ methodId: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
