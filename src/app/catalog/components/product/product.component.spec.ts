import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductsActions } from '../../store';
import { cold } from 'jasmine-marbles';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore;
  let routeId: string | null = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductComponent],
      providers: [
        provideMockStore(),
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
      ],
    }).compileComponents();

    routeId = '1';
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch selectProduct action on init', () => {
    fixture.detectChanges();
    const expected = cold('a', {
      a: ProductsActions.selectProduct({ productId: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch selectProduct action with null', () => {
    routeId = null;
    fixture.detectChanges();
    const expected = cold('a', {
      a: ProductsActions.selectProduct({ productId: null }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
