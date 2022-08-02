import { RoleNamePipe } from './role-name.pipe';
import { PipeTransform } from '@angular/core';

describe('RoleNamePipe', () => {
  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new RoleNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "customer" to "Customer"', () => {
    expect(pipe.transform('customer')).toBe('Customer');
  });

  it('should transform "sales" to "Salesman"', () => {
    expect(pipe.transform('sales')).toBe('Salesman');
  });

  it('should transform "manager" to "Manager"', () => {
    expect(pipe.transform('manager')).toBe('Manager');
  });

  it('should transform "admin" to "Administrator"', () => {
    expect(pipe.transform('admin')).toBe('Administrator');
  });

  it('should transform "disabled" to "Disabled account"', () => {
    expect(pipe.transform('disabled')).toBe('Disabled account');
  });

  it('should transform "unknown" to "unknown"', () => {
    expect(pipe.transform('unknown')).toBe('unknown');
  });
});
