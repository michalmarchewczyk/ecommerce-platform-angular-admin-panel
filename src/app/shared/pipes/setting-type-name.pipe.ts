import { Pipe, PipeTransform } from '@angular/core';
import { Setting } from '../../core/api';
import TypeEnum = Setting.TypeEnum;

@Pipe({
  name: 'settingTypeName',
})
export class SettingTypeNamePipe implements PipeTransform {
  typeNames: Record<TypeEnum, string> = {
    string: 'Text',
    number: 'Number',
    boolean: 'Boolean',
    country: 'Country',
    countriesList: 'List of countries',
    currencyCode: 'Currency',
    currenciesList: 'List of currencies',
  };

  transform(value: TypeEnum): string {
    return this.typeNames[value] ?? value;
  }
}
