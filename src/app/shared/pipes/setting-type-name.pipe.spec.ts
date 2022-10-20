import { SettingTypeNamePipe } from './setting-type-name.pipe';
import { PipeTransform } from '@angular/core';

describe('SettingTypeNamePipe', () => {
  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new SettingTypeNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "string" to "Text"', () => {
    expect(pipe.transform('string')).toBe('Text');
  });

  it('should transform "number" to "Number"', () => {
    expect(pipe.transform('number')).toBe('Number');
  });

  it('should transform "boolean" to "Boolean"', () => {
    expect(pipe.transform('boolean')).toBe('Boolean');
  });

  it('should transform "country" to "Country"', () => {
    expect(pipe.transform('country')).toBe('Country');
  });

  it('should transform "countriesList" to "List of countries"', () => {
    expect(pipe.transform('countriesList')).toBe('List of countries');
  });

  it('should transform "currencyCode" to "Currency"', () => {
    expect(pipe.transform('currencyCode')).toBe('Currency');
  });

  it('should transform "currenciesList" to "List of currencies"', () => {
    expect(pipe.transform('currenciesList')).toBe('List of currencies');
  });

  it('should transform "unknown" to "unknown"', () => {
    expect(pipe.transform('unknown')).toBe('unknown');
  });
});
