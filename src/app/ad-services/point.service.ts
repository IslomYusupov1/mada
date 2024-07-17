import {Injectable} from '@angular/core';
import {MainService} from "./main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointService extends MainService {
  protected useBearer = true
  protected returnJson = true

  pointGet(id: string) {
    return this.postData('/point/get', {id})
  }

  messageGetListV2(data: any) {
    return this.postDefaultV2('/message/get/list', data).then((res: any) => {
      return (res && res.body.data) ? res.body.data : res
    })
  }

  messageGetOneV2(key: string) {
    return this.postDefaultV2('/message/get', {key}).then((res: any) => {
      return (res && res.body.data) ? res.body.data : res
    })
  }
  messageTypeList() {
    return this.getDefaultV2('/message/types').then((res: any) => {
      return res
    })
  }

  messageEditV2(data: any) {
    return this.postDefaultV2('/message/edit', data).then((res: any) => {
      return (res && res.body.data) ? res.body.data : res
    })
  }

  messageSyncV2() {
    return this.getDefaultV2('/message/sync').then((res: any) => {
      return res
    })
  }

  messageEdit(data: any) {
    return this.postData('/message/edit', data)
  }

  messageGetOne(id: number) {
    return this.postData('/message/get', {id})
  }

  pointUpdate(data: any) {
    return this.postData('/point/update', data)
  }

  getMessageList(data: any) {
    return this.postData('/message/get/list', data)
  }

  messageAdd(data: any) {
    return this.postData('/message/add', data)
  }


  pointUnblock(id: string) {
    return this.postData('/point/unblock', {id})
  }

  pointBlock(id: string) {
    return this.postData('/point/block', {id})
  }

  getBranch(pointType: string, page: number = 1, size: number = 10) {
    return this.postData('/point/list/by/point', {pointType, page: page - 1, size})
  }
  getUsersGold(page: number = 1, size: number = 10) {
    return this.postData('/gold/user/get/list', {paging:{page: page - 1, size}})
  }
  getEposReconciliation(page: number = 1, size: number = 10) {
    return this.postData('/epos/list', {paging:{page: page - 1, size}})
  }
  reconciliationAll() {
    return this.postData('/epos/reconciliation/all',{})
  }
  reconciliationOne(id:number) {
    return this.postData(`/epos/reconciliation/${id}`,{})
  }
  VirtualConditionCardGet(cardType:string) {
    return this.postData(`/virtualCard/condition/list`,{cardType})
  }
  VirtualConditionCardOne(uuid:string) {
    return this.postData(`/virtualCard/condition/one`,{uuid})
  }
  VirtualConditionCardAdd(data: any) {
    return this.postData('/virtualCard/condition/add', data)
  }
  VirtualConditionCardEdit(data: any) {
    return this.postData('/virtualCard/condition/edit', data)
  }
  VirtualConditionCardDelete(uuid: string) {
    return this.postData('/virtualCard/condition/delete', {uuid})
  }
  getGoldUser(id:number) {
    return this.postData('/gold/user/get/one', {id})
  }

  createATMBranch(data: any) {
    return this.postData('/point/add', data)
  }
  pointRegionTypeList() {
    return this.get('/point/region/type/list')
  }

  deleteBranchOrATM(id: string) {
    return this.postData('/point/delete', {id})
  }

  deleteMessage(id: number) {
    return this.postData('/message/delete', {id})
  }

  controlServiceGetList() {
    return this.getData('/service/get/list')
  }
  getProductAccounts() {
    return this.getData('/product/account/get/list')
  }
  getProductAccount(id:number) {
    return this.postData('/product/account/get',{id})
  }
  createProductAccount(data: {logo:number,title:string,productCode:number }) {
    return this.postData('/product/account/create',data)
  }
  orderProductAccount(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.id
    })
    const obj = Object.assign({}, content)
    return this.postData('/product/account/order', obj)
  }
  productAccountTranslate(data:any) {
    return this.postData('/product/account/translate',data)
  }
  editProductAccount(data: {id:number ,logo:number,title:string,productCode:number }) {
    return this.postData('/product/account/edit',data)
  }

  controlServiceActive(serviceName: string) {
    return this.postData('/service/active', {serviceName})
  }

  controlServiceInactive(data: {serviceName: string, reason: string}) {
    return this.postData('/service/inactive', data)
  }

  uploadChatImage(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`https://mob-file-juicer.aab.uz/file/chat/upload`, formData, {
      headers: {
        'Authorization': 'Basic ZmlsZS1mb3ItY2hhdDpZbWk5dUM1UWx3UjhkVG1o'
      }
    })
  }

  protected getHeader() {
    let token = localStorage.getItem('token')
    let headerObj: any = {};
    // headerObj['device-id'] = '690A713F-4AB0-4D22-AAA2-E8455996142E1638287956.222435'
    // headerObj['device-id'] = this.deviceString
    if (this.returnJson) {
      headerObj['Content-Type'] = 'application/json'
    }
    if (this.useBearer) {
      headerObj['X-Auth-Token'] = token
    }
    return headerObj;
  }
  uploadImageBankBranches(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`https://mob-file-juicer.aab.uz/file/upload/general/map`, formData, {
      headers: {
        'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
      }
    })
  }
  appEventsGet() {
    return this.getData('/events/get')
  }

  appEventsEdit(url: string, data: {name: string, enable: boolean}) {
    return this.postData(`/events/edit/${url}`,data)
  }
}
