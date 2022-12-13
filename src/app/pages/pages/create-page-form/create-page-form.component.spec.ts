import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageFormComponent } from './create-page-form.component';

describe('CreatePageFormComponent', () => {
  let component: CreatePageFormComponent;
  let fixture: ComponentFixture<CreatePageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePageFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
