import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
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
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProductPhotoComponent } from '../product-photo/product-photo.component';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { first, skip } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore;
  let loader: HarnessLoader;
  let routeId: string | null = '1';

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
      ],
      declarations: [ProductComponent, ProductPhotoComponent, SafeUrlPipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => routeId,
              },
            },
          },
        },
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
        }),
      ],
    }).compileComponents();

    routeId = '1';
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore when product is not loaded', async () => {
    routeId = null;
    store.setState({
      catalog: {
        products: {
          list: [],
          selectedProductId: null,
          photos: [],
        },
      },
    });

    fixture.detectChanges();
    expect(component.product$).toBeTruthy();
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
    await saveButton.click();
    fixture.detectChanges();
  });

  it('should ignore save when product is not loaded', async () => {
    store.setState({
      catalog: {
        products: {
          list: [],
          selectedProductId: null,
          photos: [],
        },
      },
    });

    fixture.detectChanges();
    await component.save();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: ProductsActions.selectProduct({ productId: 1 }) }),
    );
  });
});
