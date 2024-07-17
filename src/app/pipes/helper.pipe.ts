import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'helper'
})
export class HelperPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
