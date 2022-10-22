import { Component, Input } from '@angular/core';
import { countries } from 'countries-list';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CountrySelectComponent,
    },
  ],
})
export class CountrySelectComponent implements ControlValueAccessor {
  @Input() type:
    | 'country'
    | 'countriesList'
    | 'currencyCode'
    | 'currenciesList' = 'country';
  @Input() label: string = 'Value';
  value: string | string[] = '';
  onChange = (value: string | string[]) => {};
  onTouched = () => {};

  static countries = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));
  countries = CountrySelectComponent.countries;
  static currencies = [
    ...new Set(
      Object.values(countries)
        .map((country) => country.currency.split(','))
        .flat()
        .sort()
        .filter((v) => v),
    ),
  ];
  currencies = CountrySelectComponent.currencies;
  filteredCountries = [...this.countries];
  filteredCurrencies = [...this.currencies];

  constructor() {}

  filterChange(filter: string) {
    this.filteredCountries = this.countries.filter((c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()),
    );
    this.filteredCurrencies = this.currencies.filter((c) =>
      c.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  writeValue(val: string | string[]): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
