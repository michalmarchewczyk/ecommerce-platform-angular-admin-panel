import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanText',
})
export class BooleanTextPipe implements PipeTransform {
  transform(
    value: boolean,
    trueValue: string = 'Yes',
    falseValue: string = 'No',
  ): string {
    return value ? trueValue : falseValue;
  }
}
