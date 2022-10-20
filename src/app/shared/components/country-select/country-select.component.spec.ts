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
    expect((await select.getOptions()).length).toBe(250);
  });

  it('should render currencies', async () => {
    component.type = 'currencyCode';
    fixture.detectChanges();
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    expect((await select.getOptions()).length).toBe(163);
  });

  it('should emit valueChange', async () => {
    component.type = 'country';
    fixture.detectChanges();
    spyOn(component.valueChange, 'emit');
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const option = await select.getOptions({ text: '🇵🇱 Poland (PL)' });
    await option[0].click();
    expect(component.valueChange.emit).toHaveBeenCalledWith('PL');
  });

  it('should emit valueChange with array', async () => {
    component.type = 'countriesList';
    fixture.detectChanges();
    spyOn(component.valueChange, 'emit');
    const select = await loader.getHarness(MatSelectHarness);
    await select.open();
    const option1 = await select.getOptions({ text: '🇵🇱 Poland (PL)' });
    await option1[0].click();
    const option2 = await select.getOptions({ text: '🇺🇸 United States (US)' });
    await option2[0].click();
    expect(component.valueChange.emit).toHaveBeenCalledWith(['PL', 'US']);
  });
});
