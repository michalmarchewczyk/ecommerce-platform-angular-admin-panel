import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsInputComponent } from './order-items-input.component';

describe('OrderItemsInputComponent', () => {
  let component: OrderItemsInputComponent;
  let fixture: ComponentFixture<OrderItemsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemsInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
