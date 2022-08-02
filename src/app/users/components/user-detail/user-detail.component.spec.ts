import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleNamePipe } from '../../../shared/pipes/role-name.pipe';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { UsersActions } from '../../store';
import { cold } from 'jasmine-marbles';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [UserDetailComponent, RoleNamePipe, ConfirmDialogComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      email: 'test@test.local',
      registered: '',
      role: 'customer',
    };
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input values', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(3);
    expect(await inputs[0].getValue()).toBe('test@test.local');
    expect(await inputs[1].getValue()).toBe('');
    expect(await inputs[2].getValue()).toBe('');
    const select = await loader.getHarness(MatSelectHarness);
    expect(await select.getValueText()).toBe('Customer');
  });

  it('should dispatch updateUser action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('test2@test.local');
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();
    const expected = cold('a', {
      a: UsersActions.updateUser({
        id: 1,
        data: {
          email: 'test2@test.local',
          role: 'customer',
          firstName: undefined,
          lastName: undefined,
        },
      }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch deleteUser action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();
    const expected = cold('a', {
      a: UsersActions.deleteUser({ id: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
