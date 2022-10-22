import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAddFormComponent } from './setting-add-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SettingTypeNamePipe } from '../../../shared/pipes/setting-type-name.pipe';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { cold } from 'jasmine-marbles';
import { SettingCreateDto } from '../../../core/api';
import TypeEnum = SettingCreateDto.TypeEnum;
import { SettingsActions } from '../../store';
import { MatButtonHarness } from '@angular/material/button/testing';
import { FormatCountryPipe } from '../../../shared/pipes/format-country.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

describe('SettingAddFormComponent', () => {
  let component: SettingAddFormComponent;
  let fixture: ComponentFixture<SettingAddFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
      ],
      declarations: [
        SettingAddFormComponent,
        CountrySelectComponent,
        SettingTypeNamePipe,
        FormatCountryPipe,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch createSetting action', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[0].clickOptions({ text: 'Number' });
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Test name');
    await inputs[1].setValue('Test description');
    await inputs[2].setValue('123');

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Add' }),
    );
    await button.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: SettingsActions.createSetting({
          data: {
            type: TypeEnum.Number,
            name: 'Test name',
            description: 'Test description',
            defaultValue: '123',
          },
        }),
      }),
    );
  });

  it('should dispatch createSetting action with array', async () => {
    let selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[0].clickOptions({ text: 'List of countries' });
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Test name');
    await inputs[1].setValue('Test description');
    selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[1].clickOptions({ text: '🇵🇱 Poland (PL)' });
    await selects[1].clickOptions({ text: '🇺🇸 United States (US)' });

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Add' }),
    );
    await button.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: SettingsActions.createSetting({
          data: {
            type: TypeEnum.CountriesList,
            name: 'Test name',
            description: 'Test description',
            defaultValue: 'PL,US',
          },
        }),
      }),
    );
  });
});
