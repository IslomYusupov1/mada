import {Component, OnInit} from '@angular/core';
import {PaynetService} from "../../../ad-services/paynet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cashback-rate-history',
  templateUrl: './cashback-rate-history.component.html',
  styleUrls: ['./cashback-rate-history.component.scss']
})
export class CashbackRateHistoryComponent implements OnInit {
  loading: boolean = false
  dataList: Array<any> = []
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  constructor(
    private paymentService: PaynetService,
    private router: Router,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true
    this.paymentService.cashbackRateHistory(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loading = false
      }
    })
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.paging.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
