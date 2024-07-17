import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../ad-services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styles: []
})
export class OfferComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }

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
  }

  getList() {
    this.authService.getCommissionList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
      }
    })
  }
  navigateTo(id:number) {
      this.router.navigate(['settings/offer/detail'], {queryParams: {id: id}}).then(() => {})

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
