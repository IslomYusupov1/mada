import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoanService} from "../../../ad-services/loan.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LoanFolderInfoDialogComponent} from "./loan-folder-info-dialog/loan-folder-info-dialog.component";
import {LoanFolderErrorMessageComponent} from "./loan-folder-error-message/loan-folder-error-message.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {
  LoanPortfelAdminStatisticsComponent
} from "../../../ad-components/products/loan-portfel-admin-statistics/loan-portfel-admin-statistics.component";

export type TStatistics = {
  totalCount: number,
  amount: number
}

export type TStatisticsData = {
  order: number,
  title: string,
  totalCount: number,
  amount: number
}

@Component({
  selector: 'app-loan-portfel',
  templateUrl: './loan-portfel.component.html',
  styleUrls: ['./loan-portfel.component.scss']
})
export class LoanPortfelComponent implements OnInit {
  loadingList: boolean = false;
  selectedFilterBtn: string = ''
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  isFilter: boolean = true
  totalCount: number = 0
  totalAmount: number = 0
  periodList: Array<TStatisticsData> = []
  from: string = ''
  to: string = ''
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  filterForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    phone: '',
    pinfl: '',
    passport: '',
    clientCode: '',
    productId: '',
    operatingLoanState: '',
    absLoanId: '',
    // loanApplicationStatus: 'CLOSE',
    // applicationState: 'SUCCESS',
    // loanApplicationStep: 'ISSUED',
    // absApplicationState: 'CREATE_ISSUANCE',
    // troublesome: 'Все',
  })

  statusList: Array<{ title: string, value: string }> = [
    {value: 'UNUSED', title: 'Неиспользованная ссуда'},
    {value: 'UNAPPROVED', title: 'Неутвержденная ссуда'},
    {value: 'UNISSUED', title: 'Невыданная ссуда'},
    {value: 'CURRENT', title: 'Текущая ссуда'},
    {value: 'CURRENT_WITH_OVERDUE_OR_EXTENDED', title: 'Текущая ссуда с просроченным или пролонгированным этапом'},
    {value: 'PROLONGED', title: 'Пролонгированная ссуда'},
    {value: 'OVERDUE', title: 'Просроченная ссуда'},
    {value: 'INTEREST_DEBT', title: 'Задолженность по процентам'},
    {value: 'PENDING_REMOVAL_COLLATERAL', title: 'Ссуды, ожидающие снятия залога'},
    {value: 'DECOMMISSIONED', title: 'Списанные ссуды'},
    {value: 'CLOSED', title: 'Закрытая ссуда'},
    {value: 'PARTIALLY_OVERDUE', title: 'Частично просроченные пролонгированные ссуды'},
    {value: 'IN_LITIGATION', title: 'Ссуда в процессе судебного разбирательства'}
  ]

  // absApplicationStateList: Array<string> = [
  //   'Все',
  //   'CHECK_CONVEYOR',
  //   'PAY_INSURANCE',
  //   'CREATE_CUSTOMER',
  //   'CREATE_APPLICATION',
  //   'CHECK_APPLICATION',
  //   'CREATE_CONTRACT',
  //   'CHECK_CONTRACT',
  //   'CREATE_ISSUANCE'
  // ]
  //
  // loanApplicationStatusList: Array<string> = [
  //   'Все',
  //   'OPEN',
  //   'CLOSE'
  // ]
  //
  // loanApplicationStepList: Array<string> = [
  //   'Все',
  //   'NEW',
  //   'SCORING_PROCESS',
  //   'SCORING_FAIL',
  //   'SCORING_SUCCESS',
  //   'REQUEST_ACCEPTED',
  //   'REQUEST_CANCEL',
  //   'INSURANCE_PROCESS',
  //   'INSURANCE_ERROR',
  //   'LOAN_PROCESS',
  //   'ISSUED',
  // ]
  //
  // applicationStateList: Array<string> = [
  //   'Все',
  //   'PROCESS',
  //   'ERROR',
  //   'FAIL',
  //   'SUCCESS',
  //   'NEW',
  //   'CANCEL',
  //   'EXPIRED'
  // ]

  constructor(
    private loanService: LoanService,
    private router: Router,
    private fb: FormBuilder,
    private hrService: HrService,
    private dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    const today: Date = new Date()
    let firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    let firstPrevMonthDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    let lastPrevMonthDay = new Date(today.getFullYear(), today.getMonth(), 0)
    let yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    yesterday.setHours(0, 0, 0)
    today.setHours(23, 59, 59)
    // this.reqData.filter['fromTime'] = this.hr.reqDataWithTime(yesterday)
    // this.reqData.filter['toTime'] =  this.hr.reqDataWithTime(today)

    this.getCurrentMonthStatistics(firstDayThisMonth, today)
    this.getPrevMonthStatistics(firstPrevMonthDay, lastPrevMonthDay)
    this.getTodayStatistics(today)
    this.getPrevYearStatistics()
    this.getCurrentYearStatistics(today)
    // this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.loanService.folderLoanList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalCount = res.paging.totalItems
        this.totalAmount = res.totalAmount
        this.periodList.sort((a, b) => {
          return a.order - b.order
        })
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  filter(): void {
    if (this.from && this.to) {
      this.reqData.filter['fromTime'] = this.from
      this.reqData.filter['toTime'] = this.to
    } else {
      delete this.reqData.filter['fromTime']
      delete this.reqData.filter['toTime']
    }

    if (this.filterForm.value.firstName) {
      this.reqData.filter['firstName'] = this.filterForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.filterForm.value.lastName) {
      this.reqData.filter['lastName'] = this.filterForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.filterForm.value.phone) {
      this.reqData.filter['phone'] = this.filterForm.value.phone
    } else {
      delete this.reqData.filter['phone']
    }

    if (this.filterForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.filterForm.value.pinfl
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.filterForm.value.passport) {
      this.reqData.filter['passport'] = this.filterForm.value.passport
    } else {
      delete this.reqData.filter['passport']
    }

    if (this.filterForm.value.clientCode) {
      this.reqData.filter['clientCode'] = this.filterForm.value.clientCode
    } else {
      delete this.reqData.filter['clientCode']
    }

    if (this.filterForm.value.productId) {
      this.reqData.filter['productId'] = this.filterForm.value.productId
    } else {
      delete this.reqData.filter['productId']
    }

    if (this.filterForm.value.absLoanId) {
      this.reqData.filter['absLoanId'] = this.filterForm.value.absLoanId
    } else {
      delete this.reqData.filter['absLoanId']
    }

    if (this.filterForm.value.operatingLoanState) {
      this.reqData.filter['operatingLoanState'] = this.filterForm.value.operatingLoanState
    } else {
      delete this.reqData.filter['operatingLoanState']
    }

    // if (this.filterForm.value.loanApplicationStatus && this.filterForm.value.loanApplicationStatus !== 'Все') {
    //   this.reqData.filter['loanApplicationStatus'] = this.filterForm.value.loanApplicationStatus
    // } else {
    //   delete this.reqData.filter['loanApplicationStatus']
    // }
    //
    // if (this.filterForm.value.applicationState && this.filterForm.value.applicationState !== 'Все') {
    //   this.reqData.filter['applicationState'] = this.filterForm.value.applicationState
    // } else {
    //   delete this.reqData.filter['applicationState']
    // }
    //
    // if (this.filterForm.value.loanApplicationStep && this.filterForm.value.loanApplicationStep !== 'Все') {
    //   this.reqData.filter['loanApplicationStep'] = this.filterForm.value.loanApplicationStep
    // } else {
    //   delete this.reqData.filter['loanApplicationStep']
    // }
    //
    // if (this.filterForm.value.absApplicationState && this.filterForm.value.absApplicationState !== 'Все') {
    //   this.reqData.filter['absApplicationState'] = this.filterForm.value.absApplicationState
    // } else {
    //   delete this.reqData.filter['absApplicationState']
    // }
    //
    // if (this.filterForm.value.troublesome !== 'Все') {
    //   this.reqData.filter['troublesome'] = this.filterForm.value.troublesome
    // } else {
    //   delete this.reqData.filter['troublesome']
    // }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  refreshFilter(): void {
    this.currentPage = 1
    this.totalAmount = 0
    this.totalCount = 0
    this.totalPages = 0
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 10
      }
    }
    this.filterForm.patchValue({
      firstName: '',
      lastName: '',
      phone: '',
      pinfl: '',
      passport: '',
      clientCode: '',
      productId: '',
      absLoanId: '',
      operatingLoanState: '',
      // loanApplicationStatus: 'CLOSE',
      // applicationState: 'SUCCESS',
      // loanApplicationStep: 'ISSUED',
      // absApplicationState: 'CREATE_ISSUANCE',
      // troublesome: 'Все',
    })
    this.selectedFilterBtn = 'allPeriod'
    this.dataList = []
    this.from = ''
    this.to = ''
  }

  openAgreeDialog(): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы  дейстивельно хотите отправить данные ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.folderStatisticsSend()
    })
  }

  statisticsAdminIssue(): void {
    let fromDate = new Date(this.from)
    let toDate = new Date(this.to)
    this.loanService.statisticsAdminIssue({
      from: this.hrService.reqFormatDate(fromDate),
      to: this.hrService.reqFormatDate(toDate)
    }).then((res: any) => {
      if (res) {
        this.dialog.open(LoanPortfelAdminStatisticsComponent, {
          width: '550px',
          maxWidth: '550px',
          maxHeight: '700px',
          data: {
            list: res
          }
        })
      }
    })
  }

  folderStatisticsSend(): void {
    let fromDate = new Date(this.from)
    let toDate = new Date(this.to)
    this.loanService.folderStatisticsSend({
      applicationType: "LOAN",
      from: this.hrService.reqFormatDate(fromDate),
      to: this.hrService.reqFormatDate(toDate)
    }).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : '')
      }
    })
  }

  setTime(event: any) {
    this.selectedFilterBtn = ''
    this.from = event.fromTime
    this.to = event.toTime
  }

  setFromTime(event: string) {
    this.selectedFilterBtn = ''
    this.from = event ? event : ''
  }

  setToTime(event: string) {
    this.selectedFilterBtn = ''
    this.to = event ? event : ''
  }

  openDetailsDialog(item: any): void {
    this.dialog.open(LoanFolderInfoDialogComponent, {
      width: '600px',
      maxWidth: '600px',
      data: {
        info: item
      }
    })
  }

  openErrorMessage(text: string) {
    this.dialog.open(LoanFolderErrorMessageComponent, {
      width: '400px',
      data: {
        text
      }
    })
  }

  getCurrentMonthStatistics(fromDate: Date, toDate: Date) {
    let obj = {
      applicationType: 'LOAN',
      from: this.returnDate(fromDate),
      to: this.returnDate(toDate)
    }
    this.loanService.folderLoanStatistics(obj).then((res: any) => {
      if (res) {
        this.periodList.push({
          order: 4,
          title: 'За текуший месяц',
          totalCount: res.totalCount,
          amount: res.amount
        })
      }
    })
  }

  getPrevMonthStatistics(fromDate: Date, toDate: Date) {
    let obj = {
      applicationType: 'LOAN',
      from: this.returnDate(fromDate),
      to: this.returnDate(toDate)
    }
    this.loanService.folderLoanStatistics(obj).then((res: any) => {
      if (res) {
        this.periodList.push({
          order: 3,
          title: 'За прощлый месяц',
          totalCount: res.totalCount,
          amount: res.amount
        })
      }
    })
  }

  getTodayStatistics(today: Date) {
    let obj = {
      applicationType: 'LOAN',
      from: this.returnDate(today),
      to: this.returnDate(today)
    }
    this.loanService.folderLoanStatistics(obj).then((res: any) => {
      if (res) {
        this.periodList.push({
          order: 5,
          title: 'За сегодня',
          totalCount: res.totalCount,
          amount: res.amount
        })
      }
    })
  }

  getPrevYearStatistics() {
    const date = new Date()
    const firstDay = `${date.getFullYear() - 1}-01-01`
    const lastDay = `${date.getFullYear() - 1}-12-31`

    let obj = {
      applicationType: 'LOAN',
      from: firstDay,
      to: lastDay
    }
    this.loanService.folderLoanStatistics(obj).then((res: any) => {
      if (res) {
        this.periodList.push({
          order: 1,
          title: 'За прошлый год',
          totalCount: res.totalCount,
          amount: res.amount
        })
      }
    })
  }

  getCurrentYearStatistics(today: Date) {
    const firstDay = `${today.getFullYear()}-01-01`

    let obj = {
      applicationType: 'LOAN',
      from: firstDay,
      to: this.returnDate(today)
    }
    this.loanService.folderLoanStatistics(obj).then((res: any) => {
      if (res) {
        this.periodList.push({
          order: 2,
          title: 'За текущий год',
          totalCount: res.totalCount,
          amount: res.amount
        })
      }
    })
  }

  returnDate(from: Date) {
    let year = from.getFullYear()
    let month = (from.getMonth() + 1) > 9 ? from.getMonth() + 1 : `0${from.getMonth() + 1}`
    let date = from.getDate() > 9 ? from.getDate() : `0${from.getDate()}`
    return `${year}-${month}-${date}`
  }

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
