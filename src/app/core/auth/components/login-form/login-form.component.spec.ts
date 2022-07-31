import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { initialState } from '../../store/reducers/login.reducer';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({
          initialState: { auth: { login: initialState } },
        }),
      ],
      declarations: [LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render email and password inputs', async () => {
    const emailInput = await loader.getHarness(
      MatInputHarness.with({ selector: '[formControlName="email"]' }),
    );
    const passwordInput = await loader.getHarness(
      MatInputHarness.with({ selector: '[formControlName="password"]' }),
    );
    expect(await emailInput.getType()).toBe('email');
    expect(await passwordInput.getType()).toBe('password');
  });

  it('should render disabled login button', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ selector: '[type="submit"]' }),
    );
    expect(await button.getText()).toBe('Login');
    expect(await button.isDisabled()).toBe(true);
  });

  it('should render enabled login button when inputs are valid', async () => {
    component.loginForm.controls.email.setValue('test@test.local');
    component.loginForm.controls.password.setValue('test');
    const button = await loader.getHarness(
      MatButtonHarness.with({ selector: '[type="submit"]' }),
    );
    expect(await button.getText()).toBe('Login');
    expect(await button.isDisabled()).toBe(false);
  });

  it('should dispatch login action', async () => {
    component.loginForm.controls.email.setValue('test@test.local');
    component.loginForm.controls.password.setValue('test');
    const button = await loader.getHarness(
      MatButtonHarness.with({ selector: '[type="submit"]' }),
    );
    await button.click();
    const expected = cold('a', {
      a: {
        type: '[Auth] Login',
        data: { email: 'test@test.local', password: 'test' },
      },
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
