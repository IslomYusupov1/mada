import { Injectable } from '@angular/core';
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService  extends MainService{
  protected useBearer = true
  protected returnJson = true

  searchTypeList() {
    return this.getData('/search/type/list')
  }
  searchGetList() {
    return this.getData('/search/config/get/list')
  }
  searchAdd(data:any) {
    return this.postData('/search/config/add',data)
  }
  searchEdit(data:any) {
    return this.postData('/search/config/edit',data)
  }
  searchDelete(id:string) {
    return this.postData('/search/config/delete', {id})
  }
  searchGetOne(id:string) {
    return this.postData('/search/config/get/one', {id})
  }
  searchServiceList(type:string) {
    return this.postData('/search/service/list', {type})
  }
}
