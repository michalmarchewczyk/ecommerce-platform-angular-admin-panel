import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsComponent } from './returns.component';

describe('ReturnsComponent', () => {
  let component: ReturnsComponent;
  let fixture: ComponentFixture<ReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
