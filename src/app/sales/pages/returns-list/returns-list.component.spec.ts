import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsListComponent } from './returns-list.component';

describe('ReturnsListComponent', () => {
  let component: ReturnsListComponent;
  let fixture: ComponentFixture<ReturnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
