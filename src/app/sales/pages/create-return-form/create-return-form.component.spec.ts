import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReturnFormComponent } from './create-return-form.component';

describe('CreateReturnFormComponent', () => {
  let component: CreateReturnFormComponent;
  let fixture: ComponentFixture<CreateReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReturnFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
