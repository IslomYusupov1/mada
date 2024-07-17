import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AdStatusDialogComponent} from "../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  protected apiUrl = environment.API_URL;
  protected apiUrlV2 = 'https://mob-audit-api-juicer.aab.uz/api/v2';
  protected useBearer = false
  protected returnJson = true

  constructor(
    protected http: HttpClient,
    protected router: Router,
    public dialog: MatDialog,
    protected device: DeviceDetectorService
  ) {}



  init() {
    window.localStorage.setItem('loadingCol', '0')
  }

  protected getUrl(url:String) {
    // if (this.urlStep === 2) {
    //   return this.apiUrl2 + String(url)
    // }
    return this.apiUrl + String(url)
  }
  protected getUrlV2(url:String) {
    // if (this.urlStep === 2) {
    //   return this.apiUrl2 + String(url)
    // }
    return this.apiUrlV2 + String(url)
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

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  protected handleError(error: any, url: string = '') {
    if (error.status === 401) {
      if (url === '/auth/token/init') {
        this.showMessage(false, '', (error.error && error.error.errorMessage) ? error.error.errorMessage : 'Ошибка!')
      }
      this.logout()
    } else if (error.status === 400 || error.status === 403|| error.status === 409 || error.status === 418 || error.status === 500 || error.status === 503) {
      this.showMessage(false, '', (error.error && error.error.errorMessage) ? error.error.errorMessage : 'Ошибка!')
    } else if (error.status === 0) {
      this.showMessage(false, '', error.statusText)
    }
    // console.log(error)
    return null
  }

  protected postDefault(url:string, data: any, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = {...this.getHeader(), ...headers}
    this.increaseLoadingCol()
    return this.http.post<any>(url2, data, { headers: new HttpHeaders(reqHeader), observe: 'response'}).toPromise().then(r => {
      this.decreaseLoadingCol()
      return r
    }).catch(e => {
      this.decreaseLoadingCol()
      this.handleError(e, url)
    })
  }

  protected postDefaultNoLoad(url:string, data: any, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = {...this.getHeader(), ...headers}
    return this.http.post<any>(url2, data, { headers: new HttpHeaders(reqHeader), observe: 'response'}).toPromise().then(res => {
      return (res && res.body.data) ? res.body.data : res
    }).catch(e => {
      this.handleError(e, url)
    })
  }

  protected postDefaultV2(url:string, data: any, headers: any = {}) {
    const url2 = this.getUrlV2(url);
    let reqHeader = {...this.getHeader(), ...headers}
    this.increaseLoadingCol()
    return this.http.post<any>(url2, data, { headers: new HttpHeaders(reqHeader), observe: 'response'}).toPromise().then(r => {
      this.decreaseLoadingCol()
      return r
    }).catch(e => {
      this.decreaseLoadingCol()
      this.handleError(e, url)
    })
  }
  protected post(url: string, data: any, headers: any = {}) {
    // if (this.deviceString) {
    return this.postDefault(url, data, headers)
    // } else {
    // return this.loadDevice().then(() => {
    //   return this.postDefault(url, data, headers)
    // })
    // }
  }
  protected postData(url: string, data: any, headers: any = {}) {
    return this.post(url, data, headers).then(res => {
      return (res && res.body.data) ? res.body.data : res
    })
  }

  protected getDefault(url: string, headers: any = {}) {
    console.log('aa')
    const url2 = this.getUrl(url);
    let reqHeader = {...this.getHeader(), ...headers}
    this.increaseLoadingCol()
    return this.http.get<any>(url2, {headers: new HttpHeaders(reqHeader)}).toPromise().then(r => {
      this.decreaseLoadingCol()
      return r
    }).catch(e => {
      this.decreaseLoadingCol()
      this.handleError(e)
    })
  }

  protected getDefaultV2(url: string, headers: any = {}) {
    const url2 = this.getUrlV2(url);
    let reqHeader = {...this.getHeader(), ...headers}
    this.increaseLoadingCol()
    return this.http.get<any>(url2, {headers: new HttpHeaders(reqHeader)}).toPromise().then(r => {
      this.decreaseLoadingCol()
      return r
    }).catch(e => {
      this.decreaseLoadingCol()
      this.handleError(e)
    })
  }

  protected get(url: string, headers: any = {}) {
    // if (this.deviceString) {
    return this.getDefault(url, headers)
    // } else {
    //   return this.loadDevice().then(() => {
    //     return this.getDefault(url, headers)
    //   })
    // }
  }
  protected getData(url: string, headers: any = {}) {
    return this.get(url, headers).then(res => {
      return (res && res.data) ? res.data : res
    })
  }

  protected deleteDefault(url: string, headers: any = {}) {
    const url2 = this.getUrl(url);
    let reqHeader = {...this.getHeader(), ...headers}
    this.increaseLoadingCol()
    return this.http.delete<any>(url2, {headers: new HttpHeaders(reqHeader)}).toPromise().then(r => {
      this.decreaseLoadingCol()
      return r
    }).catch(e => {
      this.decreaseLoadingCol()
      this.handleError(e)
    })
  }

  protected delete(url: string, headers: any = {}) {
    // if (this.deviceString) {
    return this.deleteDefault(url, headers)
    // } else {
    //   return this.loadDevice().then(() => {
    //     return this.deleteDefault(url, headers)
    //   })
    // }
  }

  protected deleteData(url: string, headers: any = {}) {
    return this.delete(url, headers).then(res => {
      return (res && res.data) ? res.data : res
    })
  }

  getLoadingCol(): number {
    let col = window.localStorage.getItem('loadingCol')
    let num = col ? Number.parseInt(col) : 0
    if (Number.isNaN(num)) {
      num = 0
    }
    return num
  }
  increaseLoadingCol() {
    let num = this.getLoadingCol()
    num++
    window.localStorage.setItem('loadingCol', num.toString())
  }
  decreaseLoadingCol() {
    let num = this.getLoadingCol()
    if (num > 0) {
      num--
      window.localStorage.setItem('loadingCol', num.toString())
    }
  }

  logout() {
    let ds = this.deviceString
    setTimeout(() => {
      localStorage.clear()
      this.deviceString = ds
      this.router.navigate(['']).then(() => {});
    }, 10)
  }

  get deviceString(): string {
    let deviceString = window.localStorage.getItem('deviceString')
    return deviceString ? deviceString : ''
  }

  set deviceString(val) {
    window.localStorage.setItem('deviceString', val.toString())
  }
}
