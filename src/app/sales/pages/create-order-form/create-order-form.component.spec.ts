import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderFormComponent } from './create-order-form.component';

describe('CreateOrderFormComponent', () => {
  let component: CreateOrderFormComponent;
  let fixture: ComponentFixture<CreateOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
