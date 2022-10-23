import { Pipe, PipeTransform } from '@angular/core';
import { selectSettingByName } from '../../settings/store';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(private store: Store) {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectSettingByName('Currency')).subscribe((currency) => {
      this.formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      });
    });
  }

  transform(value: number, symbolOnly: boolean = false) {
    if (symbolOnly) {
      return this.formatter.formatToParts(0).find((p) => p.type === 'currency')
        ?.value;
    } else {
      return this.formatter.format(value);
    }
  }
}
