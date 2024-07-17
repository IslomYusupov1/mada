import {Injectable} from '@angular/core';
import * as Forge from 'node-forge'
import {AdStatusDialogComponent} from "../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class HrService {

  constructor(private dialog: MatDialog) {
  }

  encWithPubKey(valueToEncrypt: string, pubKey: string): string {
    let realPubKey = '-----BEGIN PUBLIC KEY-----\n' + pubKey + '\n-----END PUBLIC KEY-----'
    const rsa = Forge.pki.publicKeyFromPem(realPubKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  validationClass(val: any) {
    return {
      'is-invalid': (val && val.invalid && (val.dirty || val.touched)),
      'is-valid': (val && val.valid && (val.dirty || val.touched))
    }
  }

  dateFormat(value: string) {
    let result: string = ''
    let date: Date = new Date(value)
    let year = date.getFullYear().toString().substr(2, 2)
    let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    let hours: string = date.getHours() <= 9 ? `0${date.getHours()}` : `${date.getHours()}`
    let minutes: string = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    result = `${day}/${month}/${year} ${hours}:${minutes}`
    return result
  }

  reqFormatDate(date: Date): string {
    let d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + (d.getDate())
    let year = d.getFullYear()

    if (month.length < 2) {
      month = `0${month}`
    }

    if (day.length < 2) {
      day = `0${day}`;
    }

    return [year, month, day].join('-')
  }

  reqDataWithTime(date: Date): string {
    let newDate = new Date(date)
    let year = newDate.getFullYear()
    let month = (newDate.getMonth() + 1) > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`
    let day = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`
    let hours = newDate.getHours() > 9 ? newDate.getHours() : `0${newDate.getHours()}`
    let minutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : `0${newDate.getMinutes()}`
    let seconds = newDate.getSeconds() > 9 ? newDate.getSeconds() : `0${newDate.getSeconds()}`
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  getOrderCardStatus(value: string): string {
    switch (value) {
      case 'NEW':
        return 'Новый';
      case 'DECLINED':
        return 'Отклоненный';
      case 'IN_PROGRESS':
        return 'В процессе';
      case 'READY':
        return 'Готовый';
      case 'DELIVERING':
        return 'Доставка';
      case 'SUCCESS':
        return 'Успешно';
      default:
        return 'Неизвестно'
    }
  }

  getOrderCardStatusClass(value: string): string {
    switch (value) {
      case 'NEW':
        return 'class-new';
      case 'DECLINED':
        return 'class-declined';
      case 'IN_PROGRESS':
        return 'class-progress';
      case 'READY':
        return 'class-ready';
      case 'DELIVERING':
        return 'class-delivering';
      case 'SUCCESS':
        return 'class-success';
      default:
        return 'Неизвестно'
    }
  }

  getVirtualCardStatus(value: string): string {
    switch (value) {
      case 'NEW':
        return 'Новый';
      case 'CREATED':
        return 'Создано';
      case 'ACTIVE':
        return 'Активный';
      case 'INACTIVE':
        return 'Неактивный';
      default:
        return 'Неизвестно'
    }
  }

  getOrderVirtualCardStatusClass(value: string): string {
    switch (value) {
      case 'NEW':
        return 'class-ready';
      case 'INACTIVE':
        return 'class-declined';
      case 'CREATED':
        return 'class-progress';
      case 'ACTIVE':
        return 'class-success';
      default:
        return ''
    }
  }

  public showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    let dialogRef = this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
    setTimeout(()=>{
      dialogRef.close()
    },2000)
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
