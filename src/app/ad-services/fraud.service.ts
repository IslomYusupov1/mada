import {Injectable} from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class FraudService extends MainService {
  protected useBearer = true
  protected returnJson = true

  getFraudLogsList(data: any) {
    return this.postData('/fraud-action/list', data)
  }

  getFraudActionTypeList() {
    return this.getData('/fraud-action/type/list')
  }


  getFraudUsersList(paging: object, param: object) {
    return this.postData('/fraud-account/user/list', {
      paging,
      param
    })
  }

  getFraudDeviceList(paging: object, param: object) {
    return this.postData('/fraud-account/device/list', {
      paging,
      param
    })
  }

  getFrauds() {
    return this.getData('/fraud-limit/list')
  }

  limitType() {
    return this.getData('/fraud-limit/type/list')
  }

  fraudSort(list: Array<any>) {
    let content = list.map((value, index) => {
      return index + 1 && value.uuid
    })
    const obj = Object.assign({}, content)
    console.log(obj)
    return this.postData('/fraud-limit/order', obj)
  }

  getOneFraud(uuid: string) {
    return this.postData('/fraud-limit/one', {uuid})
  }

  delete(uuid: string) {
    return this.postData('/fraud-limit/delete', {uuid})
  }

  changeStatusDevice(uuid: string) {
    return this.postData('/fraud-account/device/change/status', {uuid})
  }

  changeStatusUser(uuid: string) {
    return this.postData('/fraud-account/user/change/status', {uuid})
  }

  addFraud(data: any) {
    return this.postData('/fraud-limit/add', data)
  }

  editFraud(data: any) {
    return this.postData('/fraud-limit/edit', data)
  }
}
