import { Component, OnInit } from '@angular/core';
import {LoanService} from "../../../ad-services/loan.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  loading: boolean = false
  dataList: Array<any> = []
  totalPages: number = 0
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }

  constructor(
    private loanService: LoanService,
    private router: Router
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
    this.loading = true
    this.loanService.insuranceGetList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.body.content
        this.dataList.forEach((item,i)=>{
          item.position = (this.reqData.page * this.reqData.size) + (i + 1)
        })
        console.log(res.body.content)
        this.totalPages = res.body.paging.totalPages
        this.loading = false
      } else {
        this.dataList = []
        this.loading = false
      }
    })
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.page = val - 1
      this.currentPage = val
      this.getData()
    }
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
