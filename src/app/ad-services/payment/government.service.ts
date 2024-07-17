import {Injectable} from '@angular/core';
import {MainService} from "../main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GovernmentService extends MainService {
  protected useBearer = true
  protected returnJson = true

  stateCategoryList(data: any) {
    return this.postData('/state/category/list', data)
  }

  stateCategoryOne(id: string) {
    return this.postData('/state/category/one', {id})
  }

  stateCategoryVisibility(categoryId: string, visible: string) {
    return this.postData('/state/category/visibility', {categoryId, visible})
  }

  stateCategoryCreate(data: { title: string, parent: string | null }) {
    return this.postData('/state/category/create', data)
  }

  stateCategoryEdit(data: { title: string, categoryId: string }) {
    return this.postData('/state/category/edit', data)
  }

  stateCategorySort(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.uuid
    })
    const obj = Object.assign({}, content)
    return this.postData('/state/category/order', obj)
  }

  stateCategoryAttachLogo(data: any) {
    return this.postData('/state/category/attach/logo', data)
  }

  stateCategoryTranslate(data: { titleTranslate: { [key: string]: string }, categoryId: string }) {
    return this.postData('/state/category/translate', data)
  }

  stateServiceInfoCreate(data: any) {
    return this.postData('/state/service/info/add', data)
  }

  stateServiceInfoEdit(data: any) {
    return this.postData('/state/service/info/edit', data)
  }

  stateServiceCreate(data: any) {
    return this.postData('/state/service/create', data)
  }

  stateServiceEdit(data: any) {
    return this.postData('/state/service/edit', data)
  }

  stateServiceVisibility(serviceId: string, visible: string) {
    return this.postData('/state/service/visibility', {serviceId, visible})
  }

  stateServiceAttachLogo(data: { serviceId: string, logo: string }) {
    return this.postData('/state/service/attach/logo', data)
  }

  stateServiceOne(uuid: string) {
    return this.postData('/state/service/one', {uuid})
  }

  stateServiceTranslate(data: { serviceShortTitleTranslate: { [key: string]: string }, serviceFullTitleTranslate: { [key: string]: string }, id: string }) {
    return this.postData('/state/service/translate', data)
  }

  stateReqParamOrder(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.uuid
    })
    const obj = Object.assign({}, content)
    return this.postData('/state/request/param/order', obj)
  }

  // Response params
  stateResParamCreate(data: any) {
    return this.postData('/state/response/param/create', data)
  }

  stateResParamEdit(data: any) {
    return this.postData('/state/response/param/edit', data)
  }

  stateResParamTranslates(data: {titleTranslate: {[key: string]: string}, responseParamId: string}) {
    return this.postData('/state/response/param/translate', data)
  }

  stateReqParamCreate(data: any) {
    return this.postData('/state/request/param/create', data)
  }

  stateReqParamEdit(data: any) {
    return this.postData('/state/request/param/edit', data)
  }

  stateReqParamOne(uuid: string) {
    return this.postData('/state/request/param/one', {uuid})
  }

  stateReqParamTranslate(data: {titleTranslate: {[key: string]: string}, requestParamId: string}) {
    return this.postData('/state/request/param/translate', data)
  }

  stateServiceTypeList() {
    return this.getData('/state/service/type/list')
  }

  stateFieldTypeList() {
    return this.getData('/state/field/type/list')
  }

  stateServiceNameList() {
    return this.getData('/state/service/name/list')
  }

  stateServiceHistory(data: any) {
    return this.postData('/state/service/history', data)
  }

  stateServiceHistoryStatistics(data: any) {
    return this.postData('/state/service/history/statistics', data)
  }

  stateServiceHistoryOne(data: any) {
    return this.postData('/state/service/history/one', data)
  }

  stateImageUpload(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post('https://mob-file-juicer.aab.uz/file/upload?dir=STATE', formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }
}
