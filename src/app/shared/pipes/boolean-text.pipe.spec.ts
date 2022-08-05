import { BooleanTextPipe } from './boolean-text.pipe';

describe('BooleanTextPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "true" to "Yes"', () => {
    const pipe = new BooleanTextPipe();
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('should transform "false" to "No"', () => {
    const pipe = new BooleanTextPipe();
    expect(pipe.transform(false)).toBe('No');
  });

  it('should transform "true" to custom string', () => {
    const pipe = new BooleanTextPipe();
    expect(pipe.transform(true, 'TRUE')).toBe('TRUE');
  });

  it('should transform "false" to custom string', () => {
    const pipe = new BooleanTextPipe();
    expect(pipe.transform(false, 'TRUE', 'FALSE')).toBe('FALSE');
  });
});
