import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPhotoComponent } from './product-photo.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Product } from '../../../core/api';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';

describe('ProductPhotoComponent', () => {
  let component: ProductPhotoComponent;
  let fixture: ComponentFixture<ProductPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPhotoComponent, SafeUrlPipe],
      providers: [
        provideMockStore({
          initialState: {
            catalog: {
              products: {
                list: [],
                selectedProductId: null,
                photos: [
                  {
                    id: 1,
                    data: new Blob(['photo1']),
                  },
                  {
                    id: 2,
                    data: new Blob(['photo2']),
                  },
                ],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPhotoComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Product 1',
      photos: [
        { id: 1, path: 'photo1' },
        { id: 2, path: 'photo2' },
      ],
    } as Product;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the photo', async () => {
    fixture.detectChanges();
    const blob = await fetch(
      fixture.nativeElement.querySelector('img').src,
    ).then((r) => r.blob());
    expect(await blob.text()).toBe('photo1');
  });

  it('should display first photo in order', async () => {
    component.product = {
      id: 1,
      name: 'Product 1',
      photos: [
        { id: 1, path: 'photo1' },
        { id: 2, path: 'photo2' },
      ],
      photosOrder: '2,1',
    } as Product;
    fixture.detectChanges();
    const blob = await fetch(
      fixture.nativeElement.querySelector('img').src,
    ).then((r) => r.blob());
    expect(await blob.text()).toBe('photo2');
  });

  it('should display icon if no photo', () => {
    component.product.photos = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
  });
});
