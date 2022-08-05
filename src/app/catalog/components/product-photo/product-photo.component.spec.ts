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
                    data: new Blob(),
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
      photos: [{ id: 1, path: 'photo1' }],
    } as Product;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the photo', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img').src).toContain('blob:');
  });

  it('should display icon if no photo', () => {
    component.product.photos = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
  });
});
