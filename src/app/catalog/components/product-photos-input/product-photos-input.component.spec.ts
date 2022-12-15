import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosInputComponent } from './product-photos-input.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductPhotoComponent } from '../product-photo/product-photo.component';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';
import { MatIconModule } from '@angular/material/icon';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { Product } from '../../../core/api';
import { ProductsActions } from '../../store';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { first, skip } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('ProductPhotosInputComponent', () => {
  let component: ProductPhotosInputComponent;
  let fixture: ComponentFixture<ProductPhotosInputComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MaterialFileInputModule,
        MatFormFieldModule,
        MatInputModule,
        DragDropModule,
      ],
      declarations: [
        ProductPhotosInputComponent,
        ProductPhotoComponent,
        SafeUrlPipe,
      ],
      providers: [
        provideMockStore({
          initialState: {
            catalog: {
              products: {
                photos: [
                  {
                    id: 2,
                    data: new Blob(['']),
                  },
                  {
                    id: 3,
                    data: new Blob(['']),
                  },
                ],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPhotosInputComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Product 1',
      photos: [
        {
          id: 2,
          path: 'photo',
        },
        {
          id: 3,
          path: 'photo2',
        },
      ],
    } as Product;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product photos', async () => {
    const images = fixture.debugElement.queryAll(By.css('app-product-photo'));
    expect(images.length).toBe(2);
    expect(images[0].attributes['ng-reflect-photo-id']).toBe('2');
  });

  it('should display sorted product photos', async () => {
    component.product = {
      ...component.product,
      photosOrder: '3,2',
    } as Product;
    await component.ngOnChanges({
      product: { currentValue: component.product },
    } as any);
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('app-product-photo'));
    expect(images.length).toBe(2);
    expect(images[0].attributes['ng-reflect-photo-id']).toBe('3');
    expect(images[1].attributes['ng-reflect-photo-id']).toBe('2');
  });

  it('should display input photos', async () => {
    const file = new File(['file'], 'test.jpg', {
      type: 'image/jpeg',
    });
    component.photosToSave.setValue(new FileInput([file]));
    component.updatePhotosToDisplay();
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(3);
    expect(images[1].attributes['src']).toMatch('blob:');
  });

  it('should remove photo from input', async () => {
    const file = new File(['file'], 'test.jpg', {
      type: 'image/jpeg',
    });
    component.photosToSave.setValue(new FileInput([file]));
    component.updatePhotosToDisplay();
    fixture.detectChanges();
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(3);
    component.removePhoto('test.jpg');
    fixture.detectChanges();
    const images2 = fixture.debugElement.queryAll(By.css('img'));
    expect(images2.length).toBe(2);
  });

  it('should mark photos to delete', async () => {
    const images = fixture.debugElement.queryAll(By.css('app-product-photo'));
    expect(images.length).toBe(2);
    expect(images[0].classes['to-delete']).toBeFalsy();
    component.markPhotoToDelete(2);
    fixture.detectChanges();
    expect(images[0].classes['to-delete']).toBe(true);
    component.unmarkPhoto(2);
    fixture.detectChanges();
    expect(images[0].classes['to-delete']).toBeFalsy();
  });

  it('should reorder photos', async () => {
    const images = fixture.debugElement.queryAll(By.css('app-product-photo'));
    expect(images.length).toBe(2);
    expect(images[0].attributes['ng-reflect-photo-id']).toBe('2');
    expect(images[1].attributes['ng-reflect-photo-id']).toBe('3');
    await component.dropPhoto({ previousIndex: 0, currentIndex: 1 } as any);
    fixture.detectChanges();
    const images2 = fixture.debugElement.queryAll(By.css('app-product-photo'));
    expect(images2.length).toBe(2);
    expect(images2[0].attributes['ng-reflect-photo-id']).toBe('3');
    expect(images2[1].attributes['ng-reflect-photo-id']).toBe('2');
  });

  it('should dispatch save actions', async () => {
    component.markPhotoToDelete(2);
    const file = new File(['file'], 'test.jpg', {
      type: 'image/jpeg',
    });
    component.photosToSave.setValue(new FileInput([file]));
    component.updatePhotosToDisplay();
    fixture.detectChanges();

    store.scannedActions$.pipe(skip(2), first()).subscribe((action) => {
      expect(action).toEqual(
        ProductsActions.addProductPhoto({
          productId: 1,
          data: file,
        }),
      );
    });
    store.scannedActions$.pipe(skip(3), first()).subscribe((action) => {
      expect(action).toEqual(
        ProductsActions.deleteProductPhoto({
          productId: 1,
          photoId: 2,
        }),
      );
    });

    await component.save();
    fixture.detectChanges();
  });

  it('should ignore save if product is not loaded', async () => {
    component.product = null;
    fixture.detectChanges();
    await component.save();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });
});
