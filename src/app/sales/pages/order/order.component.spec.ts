import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { OrdersActions } from '../../store';
import { cold } from 'jasmine-marbles';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let store: MockStore;
  let routeId: string | null = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderComponent],
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
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectOrder action on init', () => {
    fixture.detectChanges();
    const expected = cold('a', {
      a: OrdersActions.selectOrder({ orderId: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch selectOrder action with null', () => {
    routeId = null;
    fixture.detectChanges();
    const expected = cold('a', {
      a: OrdersActions.selectOrder({ orderId: null }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
