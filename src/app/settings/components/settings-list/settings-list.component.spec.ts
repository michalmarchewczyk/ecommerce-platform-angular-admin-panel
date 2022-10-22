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
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { FormatCountryPipe } from '../../../shared/pipes/format-country.pipe';
import { MatSelectModule } from '@angular/material/select';
import { SettingTypeNamePipe } from '../../../shared/pipes/setting-type-name.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

describe('SettingsListComponent', () => {
  let component: SettingsListComponent;
  let fixture: ComponentFixture<SettingsListComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        NgxMatSelectSearchModule,
      ],
      declarations: [
        SettingsListComponent,
        ConfirmDialogComponent,
        CountrySelectComponent,
        FormatCountryPipe,
        SettingTypeNamePipe,
      ],
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
                  builtin: false,
                } as Setting,
                {
                  id: 2,
                  name: 'Test2',
                  type: 'countriesList',
                  value: ['PL', 'US'],
                  builtin: false,
                } as any,
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsListComponent);
    component = fixture.componentInstance;
    component.builtin = false;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
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

  it('should dispatch deleteSetting action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'delete' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: SettingsActions.deleteSetting({ settingId: 1 }),
      }),
    );
  });
});
