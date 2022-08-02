import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddFormComponent } from './user-add-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectUsersError } from '../../store/selectors/status.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { cold } from 'jasmine-marbles';
import { UsersActions } from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

describe('UserAddFormComponent', () => {
  let component: UserAddFormComponent;
  let fixture: ComponentFixture<UserAddFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [UserAddFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUsersError,
              value: null,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addUser action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('test@test.local');
    await inputs[1].setValue('test');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    const expected = cold('a', {
      a: UsersActions.addUser({
        data: {
          email: 'test@test.local',
          password: 'test',
          firstName: '',
          lastName: '',
        },
      }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should render error', async () => {
    store.overrideSelector(selectUsersError, 'error');
    store.refreshState();
    fixture.detectChanges();
    const formField = await loader.getHarness(MatFormFieldHarness);
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(await formField.getTextErrors()).toEqual(['Email is already taken']);
  });
});
