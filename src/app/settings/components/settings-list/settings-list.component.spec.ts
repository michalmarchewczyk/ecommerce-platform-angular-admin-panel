import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListComponent } from './settings-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectSettingsListTransformed, SettingsActions } from '../../store';
import { Setting } from '../../../core/api';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cold } from 'jasmine-marbles';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SettingsListComponent', () => {
  let component: SettingsListComponent;
  let fixture: ComponentFixture<SettingsListComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [SettingsListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectSettingsListTransformed,
              value: [
                {
                  id: 1,
                  name: 'Test',
                  type: 'string',
                  value: 'Test',
                } as Setting,
                {
                  id: 2,
                  name: 'Test2',
                  type: 'countriesList',
                  value: 'PL,US',
                } as Setting,
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSettings action', () => {
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: SettingsActions.loadSettings() }),
    );
  });

  it('should dispatch updateSetting action', async () => {
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue('Test value');

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: SettingsActions.updateSetting({
          settingId: 1,
          data: { value: 'Test value' },
        }),
      }),
    );
  });

  it('should dispatch updateSetting action with array value', async () => {
    component.save(2, ['PL', 'US']);

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: SettingsActions.updateSetting({
          settingId: 2,
          data: { value: 'PL,US' },
        }),
      }),
    );
  });
});
