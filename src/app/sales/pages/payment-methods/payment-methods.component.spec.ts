import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsComponent } from './payment-methods.component';

describe('PaymentMethodsComponent', () => {
  let component: PaymentMethodsComponent;
  let fixture: ComponentFixture<PaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentMethodsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
