import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  currencyList = [
    {code: '840', icoCode: 'USD', name: 'Доллар США'},
    {code: '978', icoCode: 'EUR', name: 'Евро'},
    {code: '826', icoCode: 'GBP', name: 'Фунт стерлингов'},
    {code: '392', icoCode: 'JPY', name: 'Иена'},
    {code: '756', icoCode: 'CHF', name: 'Швейцарский франк'},
    {code: '643', icoCode: 'RUB', name: 'Российский рубль'},
    {code: '398', icoCode: 'KZT', name: 'Казахстанский тенге'},
    {code: '860', icoCode: 'UZS', name: 'Сум'},
    {code: '0', icoCode: 'UZS', name: 'Сум'},
  ]

  transform(value: string): string {
    return '';
  }

}
