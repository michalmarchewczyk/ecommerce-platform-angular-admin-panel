import { FormatCountryPipe } from './format-country.pipe';
import { PipeTransform } from '@angular/core';

describe('FormatCountryPipe', () => {
  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new FormatCountryPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "PL" to "🇵🇱 Poland (PL)"', () => {
    expect(pipe.transform('PL')).toBe('🇵🇱 Poland (PL)');
  });

  it('should transform "PL, US" to "🇵🇱 Poland (PL), 🇺🇸 United States (US)"', () => {
    expect(pipe.transform(['PL', 'US'])).toBe(
      '🇵🇱 Poland (PL), 🇺🇸 United States (US)',
    );
  });

  it('should transform any list to string', () => {
    expect(pipe.transform(['1', '2', '3'])).toBe('1, 2, 3');
  });

  it('should transform any string to string', () => {
    expect(pipe.transform('test')).toBe('test');
  });
});
