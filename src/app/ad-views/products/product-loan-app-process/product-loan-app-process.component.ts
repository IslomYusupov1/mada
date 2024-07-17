import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoanService} from "../../../ad-services/loan.service";
import {ProductLoanAppOneComponent} from "./product-loan-app-one/product-loan-app-one.component";

@Component({
  selector: 'app-product-loan-app-process',
  templateUrl: './product-loan-app-process.component.html',
  styleUrls: ['./product-loan-app-process.component.scss']
})
export class ProductLoanAppProcessComponent implements OnInit {
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems: number = 0;
  reqData: any = {
    page: 0,
    size: 10
  }
  filter: any = {
    loanApplicationStatus: null,
    applicationState: null,
    loanApplicationStep: null,
    absApplicationState: null,
    fromTime: '',
    toTime: '',
    phone: '',
    passport: '',
    pinfl: '',
    lastName: '',
    firstName: '',
    clientCode: ''
  }

  absApplicationStateList: Array<string> = [
    'CHECK_CONVEYOR',
    'PAY_INSURANCE',
    'CREATE_CUSTOMER',
    'CREATE_APPLICATION',
    'CHECK_APPLICATION',
    'CREATE_CONTRACT',
    'CHECK_CONTRACT',
    'ABS_ISSUANCE',
    'INSURANCE_PAYMENT',
    'INSURANCE_POLICY',
    'WALLET_ISSUANCE',
    'CREATE_ISSUANCE'
  ]

  loanApplicationStepList: Array<string> = [
    'NEW',
    'SCORING_PROCESS',
    'SCORING_FAIL',
    'SCORING_SUCCESS',
    'REQUEST_ACCEPTED',
    'REQUEST_CANCEL',
    'INSURANCE_PROCESS',
    'INSURANCE_ERROR',
    'LOAN_PROCESS',
    'ISSUED',
  ]



  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loanService: LoanService
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
    this.loadingList = true
    this.loanService.getLoanAppProcesslist({
      paging: this.reqData,
      filter: this.filter
    }).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.dataList.forEach((item, i) => {
          item.position = (this.reqData.page * this.reqData.size) + (i + 1)
        })
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      } else {
        this.dataList = []
        this.totalPages = 0
        this.totalItems = 0
        this.loadingList = false
      }
    })
  }

  getOne(id: string) {
    this.loanService.getLoanAppProcessOne(id).then((res: any) => {
      if (res) {
        this.dialog.open(ProductLoanAppOneComponent, {
          width: '500px',
          maxWidth: '500px',
          maxHeight: '750px',
          data: {
            info: res
          }
        })
      }
    })
  }

  filter_() {
    this.filter.loanApplicationStatus === 'Все' ? this.filter.loanApplicationStatus = null : this.filter.loanApplicationStatus
    this.filter.applicationState === 'Все' ? this.filter.applicationState = null : this.filter.applicationState
    this.filter.loanApplicationStep === 'Все' ? this.filter.loanApplicationStep = null : this.filter.loanApplicationStep
    this.filter.absApplicationState === 'Все' ? this.filter.absApplicationState = null : this.filter.absApplicationState
    this.reqData.page = 0
    this.currentPage = 1
    this.getList()
  }

  filterDate(type: string) {
    if (type === 'date') {
      let date1 = new Date(this.filter.fromTime)
      let date = new Date(this.filter.toTime)
      let year = date.getFullYear()
      let year1 = date1.getFullYear()
      let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      let month1 = (date1.getMonth() + 1) > 9 ? date1.getMonth() + 1 : `0${date1.getMonth() + 1}`
      let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      let day1 = date1.getDate() > 9 ? date1.getDate() : `0${date1.getDate()}`
      let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
      let hours1 = date1.getHours() > 9 ? date1.getHours() : `0${date1.getHours()}`
      let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
      let minutes1 = date1.getMinutes() > 9 ? date1.getMinutes() : `0${date1.getMinutes()}`
      let seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
      let seconds1 = date1.getSeconds() > 9 ? date1.getSeconds() : `0${date1.getSeconds()}`
      const fromTime = `${year1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}`
      const toTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      if (this.filter.fromTime.length && this.filter.toTime) {
        this.filter.fromTime = fromTime
        this.filter.toTime = toTime
        this.getList()
      }
    }
    this.reqData.page = 0
    this.currentPage = 1
    if (this.filter.firstName.length > 2 || this.filter.passport.length > 2 || this.filter.phone.length > 2 || this.filter.lastName.length > 2 || this.filter.pinfl.length > 2 || this.filter.clientCode.length > 2) {
      this.getList()
    }
  }

  clearAll() {
    this.currentPage = 1;
    this.reqData = {
      page: 0,
      size: 10
    }
    this.filter = {
      loanApplicationStatus: null,
      applicationState: null,
      loanApplicationStep: null,
      absApplicationState: null,
      fromTime: '',
      toTime: '',
      phone: '',
      passport: '',
      pinfl: '',
      lastName: '',
      firstName: '',
      clientCode: ''
    }
    this.dataList = []
    this.totalPages = 0
    this.totalItems = 0

    this.getList()
  }

  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.page = val - 1
      this.currentPage = val
      this.getList()
    }
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
