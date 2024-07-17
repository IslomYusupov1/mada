import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepositService extends MainService {
  protected useBearer = true
  protected returnJson = true

  depositCreate(data: any) {
    return this.postData('/product/deposit/create', data)
  }

  documentActiveList() {
    return this.getDefaultV2('/document/active/list')
  }

  documentActiveListByType(docType: string) {
    return this.postDefaultV2('/document/active/list/by/type', {docType})
  }

  cardCreate(data: any) {
    return this.postData('/product/card/create', data)
  }

  productDepositFilter(data: any) {
    return this.postData('/product/deposit/filter', data)
  }

  productCardFilter(data: any) {
    return this.postData('/product/card/filter', data)
  }

  getProductCard(data: any) {
    return this.postData('/product/card/filter/by/pagination', data)
  }
  getConditionTypes() {
    return this.getData('/product/deposit/get/condition/type')
  }

  productDepositList(data: any) {
    return this.postData('/product/deposit/filter/by/pagination', data)
  }

  productDepositGet(id: string) {
    return this.postData('/product/deposit/get', {id})
  }

  productCardGet(id: string) {
    return this.postData('/product/card/get', {id})
  }

  productDepositUpdate(data: any) {
    return this.postData('/product/deposit/update', data)
  }

  productCardUpdate(data: any) {
    return this.postData('/product/card/update', data)
  }

  productDepositDelete(id: string) {
    return this.postData('/product/deposit/delete', {id})
  }

  productCardDelete(id: string) {
    return this.postData('/product/card/delete', {id})
  }

  productDepositDeactivate(id: string) {
    return this.postData('/product/deposit/deactivate', {id})
  }

  productCardDeactivate(id: string) {
    return this.postData('/product/card/deactivate', {id})
  }

  productDepositActivate(id: string) {
    return this.postData('/product/deposit/activate', {id})
  }

  productCardActivate(id: string) {
    return this.postData('/product/deposit/activate', {id})
  }

  productUploadImg(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`https://mob-file-juicer.aab.uz/file/upload/general/product`, formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }

  applicationReviewGetList(data: any) {
    return this.postData('/application/review/get/list', data)
  }

  applicationReviewGetOne(id: number) {
    return this.postData('/application/review/get', {id})
  }

  applicationReviewRead(id: number) {
    return this.postData('/application/review/read', {id})
  }

  applicationReviewConfirm(data: { id: number, comment: string }) {
    return this.postData('/application/review/confirm', data)
  }

  applicationReviewCancel(data: { id: number, comment: string }) {
    return this.postData('/application/review/cancel', data)
  }

  applicationReviewGetStatus() {
    return this.getData('/application/review/get/status')
  }

  applicationReviewGetType() {
    return this.getData('/application/review/get/type')
  }

  documentUpdateApplication(data: any) {
    return this.postData('/document/update/filter', data)
  }

  documentUpdateApplicationGetOne(id: number) {
    return this.postData('/document/update/get/one', {id})
  }

  documentCompareAbs(data: {id: number}) {
    return this.postData('/document/update/compare/abs', data)
  }

  documentUpdateApplicationRetry(id: number) {
    return this.postData('/document/update/retry', {id})
  }

  documentUpdateApplicationRead(id: number) {
    return this.postData('/document/update/read', {id})
  }

  documentUpdateDelete(data: {id: number}) {
    return this.postData('/document/update/delete',data)
  }

  // Upload image
  // productUploadImg(file: any): Observable<any> {
  //   const token: any = localStorage.getItem('token')
  //   const formData = new FormData()
  //   formData.append('file', file, file.name)
  //   return this.http.post(`https://mob-file-juicer.aab.uz/file/general/upload/product/${file.name}`, formData, {
  //     headers: {
  //       'X-Auth-Token': token
  //     }
  //   })
  // }
}
