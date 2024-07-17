import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../ad-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer2',
  templateUrl: './offer2.component.html',
  styles: []
})
export class Offer2Component implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  type:any
  reqData: any = {
    page: 0,
    size: 10
  }
  types: Array<{ Type: string }> = []

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
    this.getTypeList()
  }

  changeType(event: { value: string }) {
   this.type = event.value
    this.getList()
  }

  getList() {
    this.authService.getOffers2(this.type, this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.body.data.content
        this.totalPages = res.body.data.paging.totalPages
      }
    })
  }

  getTypeList() {
    this.authService.getTypeOfferList2().then((res: any) => {
      this.types = res.data
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    // @ts-ignore
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    // @ts-ignore
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
