import { AuthRoleDirective } from './auth-role.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';
import { User } from '../../api';
import RoleEnum = User.RoleEnum;
import { By } from '@angular/platform-browser';
import { selectUserRole } from '../store';

@Component({
  selector: 'app-test',
  template: '<div [appAuthRole]="roles"></div>',
})
class TestComponent {
  roles: RoleEnum[] = [];
}

describe('AuthRoleDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AuthRoleDirective],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUserRole,
              value: 'sales',
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should hide component with no roles', () => {
    component.roles = [];
    fixture.detectChanges();
    const directiveEl = fixture.debugElement.query(
      By.directive(AuthRoleDirective),
    );
    expect(directiveEl.styles['display']).toBe('none');
  });

  it('should hide component if role does not match', () => {
    component.roles = ['admin', 'manager'];
    fixture.detectChanges();
    const directiveEl = fixture.debugElement.query(
      By.directive(AuthRoleDirective),
    );
    expect(directiveEl.styles['display']).toBe('none');
  });

  it('should show component if role matches', () => {
    component.roles = ['admin', 'sales'];
    fixture.detectChanges();
    const directiveEl = fixture.debugElement.query(
      By.directive(AuthRoleDirective),
    );
    expect(directiveEl.styles['display']).toBe('');
  });
});
