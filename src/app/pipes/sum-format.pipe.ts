import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumFormat'
})
export class SumFormatPipe implements PipeTransform {

  transform(value: string, toNumber: boolean = false): string {
    if (!value) {
      return ''
    }
    let value2 = value.toString()
    if (toNumber) {
      value2 = value2.replace(/\s+/g, '')
    }
    let spl = value2.replace(/,/g, '.').split('.')
    if (spl.length >= 2) {
      let spl1 = spl[1]
      if (spl1 === '' || spl1 === '0' || spl1 === '00') {
        value2 = spl[0]
      }
    }
    if (toNumber) {
      return value2.replace(/,/g, '.')
    }
    return value2
  }

}
