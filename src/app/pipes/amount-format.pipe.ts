import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountFormat'
})
export class AmountFormatPipe implements PipeTransform {

  transform(value: string, dflt: string = '', quote: string = ','): string {
    if (!value) {
      return dflt;
    }
    let value2 = value.toString().replace(/\s+/g, '').replace(/,/g, '.')

    let spl = value2.split('.')
    let dot = ''
    if (spl.length >= 2) {
			let spl1 = spl[1].substr(0, 2)
			if (spl1 === '') {
				dot = '.'
			} else if (spl1 === '0') {
				dot = '.0'
			} else if (spl1 === '00') {
				dot = '.00'
			} else if (spl1.length === 2 && spl1.charAt(1) === '0') {
			  dot = '0'
      }
			value2 = `${spl[0]}.${spl1}`
		}

    let value3 = Number.parseFloat(value2)
    let value4 = ''
    if (!Number.isNaN(value3)) {
      value4 = value3.toString()
    }
    value4 += dot

    return value4.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/\./g, quote)
  }

  transformZero(value: string, dflt: string = '', quote: string = ','): string {
    if (!value) {
      return dflt;
    }
    let value2 = value.toString().replace(/\s+/g, '').replace(/,/g, '.')

    let spl = value2.split('.')
    let dot = ''
    if (spl.length >= 2) {
			let spl1 = spl[1].substr(0, 2)
			if (spl1 === '') {
				dot = '.'
			} else if (spl1 === '0') {
				dot = '.0'
			} else if (spl1 === '00') {
				dot = '.00'
			} else if (spl1.length === 2 && spl1.charAt(1) === '0') {
			  dot = '0'
      }
			value2 = `${spl[0]}.${spl1}`
		} else {
      dot = '.00'
    }

    let value3 = Number(value2)
    let value4 = value3.toString()
    value4 += dot

    return value4.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace(/\./g, quote)
  }

}
