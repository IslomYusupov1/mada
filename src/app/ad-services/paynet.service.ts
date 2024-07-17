import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaynetService extends MainService {
  protected useBearer = true
  protected returnJson = true

  munisList() {
    // return this.getData('/paynet/category/list').then(res => {
    //   return (res && res.length > 0) ? res : []
    // })
    return new Promise(resolve => {
      let res = [
        {
          id: '1111111111',
          imageUrl: '',
          isShow: true,
          name: 'Test1',
          order: 1
        },
        {
          id: '1111111112',
          imageUrl: '',
          isShow: true,
          name: 'Test2',
          order: 2
        },
      ]
      resolve(res)
    })
  }

  categoryList(parent: any) {
    return this.postData('/payment/category/list', {parent})
  }

  categoryGetOne(id: string) {
    return this.postData('/payment/category/one', {id})
  }

  categoryCreate(data: any) {
    return this.postData('/payment/category/create', data)
  }

  categoryChangeIsShow(paymentCategoryId: string, visible: string) {
    return this.postData('/payment/category/visibility', {paymentCategoryId, visible}, null).then(res => {
      return res ? res : null
    })
  }

  categoryAttachLogo(data: any) {
    return this.postData('/payment/category/attach/logo', data)
  }

  categorySort(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.uuid
    })
    const obj = Object.assign({}, content)
    return this.postData('/payment/category/order', obj)
  }

  categoryTitleTranslate(data: any) {
    return this.postData('/payment/category/translate', data)
  }

  categoryEdit(data: any) {
    return this.postData('/payment/category/edit', data)
  }

  serviceGetOne(uuid: string) {
    return this.postData('/payment/service/one', {uuid: uuid})
  }

  serviceCreate(data: any) {
    return this.postData('/payment/service/create', data)
  }

  serviceEdit(data: any) {
    return this.postData('/payment/service/edit', data)
  }

  serviceTitleTranslate(data: any) {
    return this.postData('/payment/service/translate', data)
  }

  serviceVisibility(paymentServiceId: string, visible: string) {
    return this.postData('/payment/service/visibility', {paymentServiceId, visible})
  }

  serviceAttachLogo(data: any) {
    return this.postData('/payment/service/attach/logo', data)
  }

  paymentFieldTypeList() {
    return this.getData('/payment/field/type/list')
  }

  serviceParamsTranslates(data: any) {
    return this.postData('/payment/request/param/translate', data)
  }

  serviceRequestParamCreate(data: any) {
    return this.postData('/payment/request/param/create', data)
  }

  serviceRequestParamGetOne(uuid: string) {
    return this.postData('/payment/request/param/one', {uuid})
  }

  serviceRequestParamEdit(data: any) {
    return this.postData('/payment/request/param/edit', data)
  }

  serviceResponseParamTranslates(data: any) {
    return this.postData('/payment/response/param/translate', data)
  }

  serviceResponseParamGetOne(uuid: string) {
    return this.postData('/payment/response/param/one', {uuid})
  }

  createResponseParam(data: any) {
    return this.postData('/payment/response/param/create', data)
  }

  serviceResponseParamEdit(data: any) {
    return this.postData('/payment/response/param/edit', data)
  }

  requestParamSort(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.uuid
    })
    const obj = Object.assign({}, content)
    return this.postData('/payment/request/param/order', obj)
  }

  serviceChangeIsShow(id: string, isShow: boolean) {
    return this.postData('/paynet/service/is/show', {id, isShow}, null).then(res => {
      return res ? res : null
    })
  }

  serviceSort(list: Array<any>) {
    let content = list.map((value, index) => {
      return {id: value.id, position: index + 1}
    })
    return this.postData('/paynet/service/category/sort', {type: 'SERVICE', content})
  }

  getServiceTypeList() {
    return this.getData('/payment/service/type/list')
  }

  getPaymentMerchantList() {
    return this.getData('/payment/service/merchant/list')
  }

  getPaymentCheckTemplateList() {
    return this.getData('/payment/service/check/template/list')
  }

  cashbackRateHistory(data: any) {
    return this.postData('/cashback/rate/history/paging', data)
  }

  cashbackHistory(data: any) {
    return this.postData('/cashback/history/paging', data)
  }

  transactionCountControl(data: {}) {
    return this.postData('/transaction/count/control', data)
  }

  transactionCountControlGet() {
    return this.getData('/transaction/count/control')
  }

  transactionCountControlSync() {
    return this.getData('/transaction/count/control/sync')
  }

  // Upload image
  uploadImg(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post('https://mob-file-juicer.aab.uz/file/upload?dir=PAYMENT', formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }
}
