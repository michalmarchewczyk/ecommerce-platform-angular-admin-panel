import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectComponent } from './country-select.component';
import { FormatCountryPipe } from '../../pipes/format-country.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
      ],
      declarations: [CountrySelectComponent, FormatCountryPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render countries', async () => {
    component.type = 'country';
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    expect((await select.getOptions()).length).toBe(251);
  });

  it('should render currencies', async () => {
    component.type = 'currencyCode';
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    expect((await select.getOptions()).length).toBe(164);
  });

  it('should filter countries', async () => {
    component.type = 'country';
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    component.filterChange('United');
    expect((await select.getOptions()).length).toBe(4);
  });

  it('should emit onChange', async () => {
    component.type = 'country';
    fixture.detectChanges();
    const mockFn = jasmine.createSpy();
    component.registerOnChange(mockFn);
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const option = await select.getOptions({ text: '🇵🇱 Poland (PL)' });
    await option[0].click();
    expect(mockFn).toHaveBeenCalledWith('PL');
  });

  it('should emit onTouched', async () => {
    component.type = 'country';
    fixture.detectChanges();
    const mockFn = jasmine.createSpy();
    component.registerOnTouched(mockFn);
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should writeValue', async () => {
    component.type = 'country';
    fixture.detectChanges();
    component.writeValue('PL');
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    expect(await select.getValueText()).toBe('🇵🇱 Poland (PL)');
  });
});
