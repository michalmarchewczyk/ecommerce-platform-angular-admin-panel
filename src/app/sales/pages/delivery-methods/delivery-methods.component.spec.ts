import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMethodsComponent } from './delivery-methods.component';

describe('DeliveryMethodsComponent', () => {
  let component: DeliveryMethodsComponent;
  let fixture: ComponentFixture<DeliveryMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryMethodsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
