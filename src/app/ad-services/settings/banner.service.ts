import {Injectable} from '@angular/core';
import {MainService} from "../main.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BannerService extends MainService {
  apiUrl: string = 'https://mob-audit-api-juicer.aab.uz/api/v1'
  protected useBearer = true
  protected returnJson = true

  bannerCollectionList(data: any) {
    return this.postData('/banner/collection/list', data)
  }

  bannerCollectionTypes() {
    return this.getData('/banner/list/collection/types')
  }

  bannerCollectionAdd(data: any) {
    return this.postData('/banner/collection/add', data)
  }

  bannerCollectionUpdate(data: any) {
    return this.postData('/banner/collection/update', data)
  }

  bannerCollectionGetOne(id: string) {
    return this.postData('/banner/collection/get', {id})
  }

  bannerCollectionDelete(id: string) {
    return this.postData('/banner/collection/delete', {id})
  }

  bannerListByCollection(id: string) {
    return this.postData('/banner/list/by/collection', {id})
  }

  bannerCreate(data: any) {
    return this.postData('/banner/create', data)
  }

  bannerUpdate(data: any) {
    return this.postData('/banner/update', data)
  }

  bannerGetOne(id: string) {
    return this.postData('/banner/get', {id})
  }

  bannerDelete(id: string) {
    return this.postData('/banner/delete', {id})
  }

  bannerBlock(id: string) {
    return this.postData('/banner/block', {id})
  }

  bannerUnblock(id: string) {
    return this.postData('/banner/unblock', {id})
  }

  bannerContentListByBanner(id: string) {
    return this.postData('/banner/content/list/by/banner', {id})
  }

  bannerContentCreate(data: any) {
    return this.postData('/banner/content/create', data)
  }

  bannerContentUpdate(data: any) {
    return this.postData('/banner/content/update', data)
  }

  bannerContentDelete(id: string) {
    return this.postData('/banner/content/delete', {id})
  }

  bannerContentGetOne(id: string) {
    return this.postData('/banner/content/get', {id})
  }

  bannerUpload(file: any): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`https://mob-file-juicer.aab.uz/file/upload/general/banner`, formData,
      {
        headers: {
          'Authorization': 'Basic bW9iLWZyb250OjcwYXVLeE10UzZOSHhRQTQ='
        }
      }
    )
  }

  bannerFileUpload(file: any): Observable<any> {
    const token: any = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${this.apiUrl}/banner/upload`, formData,
      {
        headers: {
          'X-Auth-Token': token
        }
      }
    )
  }

  bannerFileDownload(id: string) {
    const token: any = localStorage.getItem('token')
    return this.http.post(`${this.apiUrl}/banner/file/get`, {id}, {headers: {'X-Auth-Token': token}}).toPromise().then((res: any) => {
      if (res && res.data) {
        return res.data
      }
    }).catch(err => {
      this.showMessage(false, err.errorMessage ? err.errorMessage : 'Ошибка!')
    })
  }

  marketplaceOnGet() {
    return this.getData('/marketplace/on-off/get')
  }

  marketplaceOnEdit(data: any) {
    return this.postData('/marketplace/on-off/edit', data)
  }

  logSettingsGet() {
    return this.getData('/log/on-off/get')
  }

  logSettingsEdit(data: { key: string, value: boolean }) {
    return this.postData('/log/on-off/edit', data)
  }

  propertyGet(data: { page: number, size: number }) {
    return this.postData('/property/get', data)
  }

  propertyUpdate() {
    return this.getData('/property/update')
  }
  bannerTypeList() {
    return this.getData('/banner/type/list' )
  }
  infoBannerType(type:string) {
    return this.postData('/banner/type/info', {type})
  }
}
