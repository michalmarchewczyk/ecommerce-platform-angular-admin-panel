import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsActions } from '../../store';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { first, skip } from 'rxjs';
import { Product } from '../../../core/api';
import { ProductPhotosInputComponent } from '../product-photos-input/product-photos-input.component';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { selectSettingsList } from '../../../settings/store';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MaterialFileInputModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      declarations: [
        ProductDetailsComponent,
        SafeUrlPipe,
        ProductPhotosInputComponent,
        ConfirmDialogComponent,
        FormatCurrencyPipe,
      ],
      providers: [
        provideMockStore({
          initialState: {
            catalog: {
              products: {
                list: [
                  {
                    id: 1,
                    name: 'Product 1',
                    description: 'Description 1',
                    price: 123,
                    stock: 123,
                    visible: true,
                    photos: [{ id: 2, path: 'photo2' }],
                  },
                ],
                selectedProductId: 1,
                photos: [
                  {
                    id: 2,
                    data: new Blob(),
                  },
                ],
              },
            },
          },
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

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 123,
      stock: 123,
      visible: true,
      photos: [{ id: 2, path: 'photo2' }],
    } as Product;
    // fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore when product is not loaded', async () => {
    component.product = null;

    fixture.detectChanges();
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await inputs[0].getValue()).toBe('');
    expect(await inputs[1].getValue()).toBe('');
    expect(await inputs[2].getValue()).toBe('0');
    expect(await inputs[3].getValue()).toBe('0');
  });

  it('should display product properties', async () => {
    fixture.detectChanges();
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await inputs[0].getValue()).toBe('Product 1');
    expect(await inputs[1].getValue()).toBe('Description 1');
    expect(await inputs[2].getValue()).toBe('123');
    expect(await inputs[3].getValue()).toBe('123');
    const select = await loader.getHarness(MatSelectHarness);
    expect(await select.getValueText()).toBe('Visible');
  });

  it('should dispatch save actions', async () => {
    fixture.detectChanges();
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Product 2');
    await inputs[1].setValue('Description 2');
    await inputs[2].setValue('12345');
    await inputs[3].setValue('12345');

    fixture.detectChanges();
    const saveButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );

    store.scannedActions$.pipe(skip(1), first()).subscribe((action) => {
      expect(action).toEqual(
        ProductsActions.updateProduct({
          id: 1,
          data: {
            name: 'Product 2',
            description: 'Description 2',
            price: 12345,
            stock: 12345,
            visible: true,
          },
        }),
      );
    });
    spyOn(component.photosInput, 'save');
    await saveButton.click();
    fixture.detectChanges();
    expect(component.photosInput.save).toHaveBeenCalled();
  });

  it('should ignore save when product is not loaded', async () => {
    component.product = null;
    fixture.detectChanges();
    component.photosInput.photosToSave.setValue(new FileInput([]));
    spyOn(component.photosInput, 'save');
    await component.save();
    expect(component.photosInput.save).not.toHaveBeenCalled();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });

  it('should dispatch delete product action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete product' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: ProductsActions.deleteProduct({ id: 1 }),
      }),
    );
  });
});
