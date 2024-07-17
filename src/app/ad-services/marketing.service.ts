import { Injectable } from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class MarketingService extends MainService{
  protected useBearer = true
  protected returnJson = true

  getCardOrderList(data: any) {
    return this.postData('/order/card/get/list', data)
  }

  getOrderCardOne(uuid: string) {
    return this.postData('/order/card/get/one', {uuid})
  }

  getOrderCardStatus() {
    return this.getData('/order/card/get/status')
  }

  orderCardStatusChange(data: any) {
    return this.postData('/order/card/change/status', data)
  }

  getVirtualOrderedCardList(data: any) {
    return this.postData('/virtualCard/get/list', data)
  }

  getVirtualCardStatusList() {
     return this.getData('/virtualCard/get/status')
  }
}
