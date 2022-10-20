import { Pipe, PipeTransform } from '@angular/core';
import { countries, getEmojiFlag } from 'countries-list';

@Pipe({
  name: 'formatCountry',
})
export class FormatCountryPipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (Array.isArray(value)) {
      if (value.some((v) => !(v in countries))) return value.join(', ');
      return value
        .map((c) => this.formatCountry(c as keyof typeof countries))
        .join(', ');
    } else {
      if (!(value in countries)) return value;
      return this.formatCountry(value as keyof typeof countries);
    }
  }

  private formatCountry(code: keyof typeof countries): string {
    return `${getEmojiFlag(code)} ${countries[code].name} (${code})`;
  }
}
