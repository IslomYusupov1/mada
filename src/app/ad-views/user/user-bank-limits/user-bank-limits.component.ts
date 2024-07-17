import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";

@Component({
  selector: 'app-user-bank-limits',
  templateUrl: './user-bank-limits.component.html',
  styles: []
})
export class UserBankLimitsComponent implements OnInit {
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.userService.userBankLimitBankList().then((res: any) => {
      if (res) {
        this.dataList = res.cardTypes
        this.dataList.forEach((item, index) => {
          item.position = index + 1
          item.imagePath = `${item.logo.path}/${item.logo.name}.${item.logo.ext}`
        })
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  routerToOne(id: number, bankName: string) {
    this.router.navigate(['user/bank/limit', id], {queryParams: {bankName}}).then(()=>{})
  }

  // Pagination
  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.currentPage = val
      this.reqData.paging.page = val - 1
      this.getData()
    }

  }

  pagePrevTo() {
    this.currentPage--
    this.reqData.paging.page--
    this.getData()
  }

  pageNextTo() {
    this.currentPage++
    this.reqData.paging.page++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
