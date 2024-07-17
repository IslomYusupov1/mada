import {Injectable} from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MainService {
  protected useBearer = true
  protected returnJson = true

  login(token: string) {
    this.token = token
    this.refreshToken = token
    this.userName = 'Anonymus'
    this.userData = JSON.stringify({name: 'Anonymus'})
    this.router.navigate(['dashboard']).then(() => {
    })
  }

  userCheck(username: string) {
    return this.http.post('https://mob-audit-api-juicer.aab.uz/api/v1/auth/admin/sign/user/check', {username})
  }

  getTypeOfferList() {
    return this.postData('/document/list/type', {})
  }
  getOneOffer(uuid:string) {
    return this.postDefaultV2('/document/get', {uuid})
  }

  getTypeOfferList2() {
    return this.getDefaultV2('/document/type/list')
  }

  getOffers(paging: { page: number, size: number }) {
    return this.postData('/document/list/filter', {paging})
  }
  getCommissionList(paging: { page: number, size: number }) {
    return this.postData('/commission/get/list', {paging})
  }
  getCommissionOne(id:number) {
    return this.postData('/commission/get/one', {id})
  }

  getOffers2(type: any, paging: { page: number, size: number }) {
    return this.postDefaultV2('/document/filter/list', {type, paging})
  }

  createOffer(data: any) {
    return this.postData('/document/create', data)
  }
  updateDetailCommission(data: {detailId:number,isFixAmount:boolean,fixAmount:number,rate:number}) {
    return this.postData('/commission/update/detail', data)
  }
  updateConditionCommission(
    data: {
    conditionId: number,
    limitAmount: number,
    rate: number,
    isMainRate: boolean,
    isActive: boolean,
    type: string}) {
    return this.postData('/commission/update/detail/condition', data)
  }
  createOffer2(data: any) {
    return this.postDefaultV2('/document/create', data)
  }
  editOffer2(data: any) {
    return this.postDefaultV2('/document/edit', data)
  }

  notificationList(data: any) {
    return this.postData('/notification/get/list', data)
  }
  topicScheduleList(data: any) {
    return this.postData('/notification/schedule/get/send-topic', data)
  }
  chosenScheduleList(data: any) {
    return this.postData('/notification/schedule/get/send-chosen-users', data)
  }

  notificationOne(notificationId: string) {
    return this.postData('/notification/get/one', {notificationId})
  }

  verifyUser(data: any) {
    return this.http.post('https://mob-audit-api-juicer.aab.uz/api/v1/auth/admin/sign/user/verify', data)
  }

  signIn(data: any) {
    return this.http.post('https://mob-audit-api-juicer.aab.uz/api/v1/auth/admin/sign/in', data).subscribe((res: any) => {
      if (res.data.access && res.data.user) {
        this.token = res.data.access.accessToken
        this.refreshToken = res.data.access.refreshToken
        this.userData = JSON.stringify(res.data.user)

        const chatInit = res.data.user.role.permissions.some((el: string) => {
          return el === 'CHAT_INIT';
        })

        if (chatInit) {
          this.adminChatInit().then((res: any) => {
            if (res) {
              localStorage.setItem('chatToken', res.content.token)
              localStorage.setItem('sup', res.content.superOperator)
            }
          })
        }

        if (res.data.user.role.defaultUrl) {
          this.router.navigate(['/dashboard']).then(() => {
          })
        } else {
          this.router.navigate(['/dashboard']).then(() => {
          })
        }
      }
    }, (error => {
      this.showMessage(false, error.error.errorMessage)
    }))
  }

  adminChatInit() {
    return this.getData('/chat/init')
  }

  set token(value: string) {
    localStorage.setItem('token', value)
  }

  set refreshToken(val: any) {
    localStorage.setItem('refToken', val)
  }

  set userName(value: string) {
    localStorage.setItem('username', value)
  }

  set userData(value: string) {
    localStorage.setItem('userdata', value)
  }

  // get refreshToken() {
  //   return localStorage.getItem('refToken')
  // }
}
