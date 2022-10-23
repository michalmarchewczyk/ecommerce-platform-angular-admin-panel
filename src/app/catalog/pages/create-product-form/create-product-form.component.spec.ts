import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductFormComponent } from './create-product-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NewProductPhotosInputComponent } from '../../components/new-product-photos-input/new-product-photos-input.component';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import {
  ProductsActions,
  selectCatalogLoading,
  selectCatalogNewProductId,
} from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { first, skip } from 'rxjs';
import { FormatCurrencyPipe } from '../../../shared/pipes/format-currency.pipe';
import { selectSettingsList } from '../../../settings/store';

describe('CreateProductFormComponent', () => {
  let component: CreateProductFormComponent;
  let fixture: ComponentFixture<CreateProductFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatIconModule,
        MaterialFileInputModule,
      ],
      declarations: [
        CreateProductFormComponent,
        NewProductPhotosInputComponent,
        SafeUrlPipe,
        FormatCurrencyPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCatalogLoading,
              value: false,
            },
            {
              selector: selectCatalogNewProductId,
              value: 1,
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

    fixture = TestBed.createComponent(CreateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch save action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('name');
    await inputs[1].setValue('description');
    await inputs[2].setValue('123');
    await inputs[3].setValue('123');

    component.photosInput.photosToSave.setValue(
      new FileInput([new File([''], 'test.jpg')]),
    );

    fixture.detectChanges();
    const saveButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );

    store.scannedActions$.pipe(skip(1), first()).subscribe((action) => {
      expect(action).toEqual(
        ProductsActions.addProduct({
          data: {
            name: 'name',
            description: 'description',
            price: 123,
            stock: 123,
            visible: true,
          },
        }),
      );
    });
    store.scannedActions$.pipe(skip(2), first()).subscribe((action) => {
      expect(action).toEqual(
        ProductsActions.addProductPhoto({
          productId: 1,
          data: new File([''], 'test.jpg'),
        }),
      );
    });

    await saveButton.click();
    fixture.detectChanges();
  });
});
