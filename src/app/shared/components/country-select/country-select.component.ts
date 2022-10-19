import { Component, EventEmitter, Input, Output } from '@angular/core';
import { countries } from 'countries-list';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent {
  @Input() type:
    | 'country'
    | 'countriesList'
    | 'currencyCode'
    | 'currenciesList' = 'country';
  @Input() value: string | string[] = '';
  @Output() valueChange = new EventEmitter<string | string[]>();

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

  constructor() {}
}
