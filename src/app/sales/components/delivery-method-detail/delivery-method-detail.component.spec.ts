import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodDetailComponent } from './delivery-method-detail.component';
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
import { DeliveriesActions } from '../../store';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('DeliveryMethodDetailComponent', () => {
  let component: DeliveryMethodDetailComponent;
  let fixture: ComponentFixture<DeliveryMethodDetailComponent>;
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
      declarations: [DeliveryMethodDetailComponent, ConfirmDialogComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryMethodDetailComponent);
    component = fixture.componentInstance;
    component.deliveryMethod = {
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

  it('should dispatch updateDeliveryMethod action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Method 1 updated');
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();
    const expected = cold('a', {
      a: DeliveriesActions.updateDeliveryMethod({
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

  it('should dispatch deleteDeliveryMethod action', async () => {
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
      a: DeliveriesActions.deleteDeliveryMethod({ methodId: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
