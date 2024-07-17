import {Component, OnInit} from '@angular/core';
import {GovernmentService} from "../../../ad-services/payment/government.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TStatistics} from "../state-monitoring/state-monitoring.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {FormBuilder, FormGroup} from "@angular/forms";

export type TStateFilter = {
  firstName: string | null,
  lastName: string | null,
  pinfl: string | null,
  phone: string | null,
  isSuccess: string | null,
}

@Component({
  selector: 'app-state-monitoring-one',
  templateUrl: './state-monitoring-one.component.html',
  styleUrls: ['./state-monitoring-one.component.scss']
})
export class StateMonitoringOneComponent implements OnInit {
  loadingList: boolean = false
  currentPage: number = 1
  totalPages: number = 1
  totalData: any = {}
  serviceName: string = ''
  dataList: Array<any> = []
  reqData: any = {
    serviceId: '',
    paging: {
      page: 0,
      size: 10
    },
    filter: {
      firstName: null,
      lastName: null,
      isSuccess: null,
      pinfl: null,
      phone: null
    }
  }

  searchInputForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    pinfl: '',
    phone: '',
    isSuccess: ''
  })

  prevYearStatistics!: TStatistics
  currentYearStatistics!: TStatistics
  prevMonthStatistics!: TStatistics
  currentMonthStatistics!: TStatistics
  todayStatistics!: TStatistics

  constructor(
    private govService: GovernmentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private hrService: HrService
  ) {
    const param = this.route.snapshot.queryParams
    this.reqData.serviceId = param['id']
    this.reqData.filter = {
      firstName: param['firstName'] ? param['firstName'] : null,
      lastName: param['lastName'] ? param['lastName'] : null,
      isSuccess: param['isSuccess'] ? param['isSuccess'] === 'true' : null,
      pinfl: param['pinfl'] ? param['pinfl'] : null,
      phone: param['phone'] ? param['phone'] : null
    }
  }

  ngOnInit(): void {
    this.searchInputForm.patchValue({
      firstName: this.reqData.filter['firstName'] ? this.reqData.filter['firstName'] : null,
      lastName: this.reqData.filter['lastName'] ? this.reqData.filter['lastName'] : null,
      isSuccess: this.reqData.filter['isSuccess'] !== null ? (this.reqData.filter['isSuccess'] ? 'SUCCESS' : 'ERROR') : '',
      pinfl: this.reqData.filter['pinfl'] ? this.reqData.filter['pinfl'] : null,
      phone: this.reqData.filter['phone'] ? this.reqData.filter['phone'] : null
    })

    const today: Date = new Date()
    let firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    this.getPrevYearStatistics()
    this.getCurrentYearStatistics(today)
    this.getPrevMonthStatistics(today)
    this.getCurrentMonthStatistics(firstDayThisMonth, today)
    this.getTodayStatistics(today)
    this.getData()
  }

  filter(): void {
    if (!this.searchInputForm.value.firstName && !this.searchInputForm.value.lastName
      && !this.searchInputForm.value.pinfl && !this.searchInputForm.value.phone && !this.searchInputForm.value.isSuccess
      && Object.keys(this.reqData.filter).length === 0) {
      return
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1

    if (this.searchInputForm.value.firstName) {
      this.reqData.filter['firstName'] = this.searchInputForm.value.firstName
    } else {
      this.reqData.filter['firstName'] = null
    }

    if (this.searchInputForm.value.lastName) {
      this.reqData.filter['lastName'] = this.searchInputForm.value.lastName
    } else {
      this.reqData.filter['lastName'] = null
    }

    if (this.searchInputForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.searchInputForm.value.pinfl
    } else {
      this.reqData.filter['pinfl'] = null
    }

    if (this.searchInputForm.value.phone) {
      this.reqData.filter['phone'] = this.searchInputForm.value.phone
    } else {
      this.reqData.filter['phone'] = null
    }

    if (this.searchInputForm.value.isSuccess) {
      this.reqData.filter['isSuccess'] = this.searchInputForm.value.isSuccess === 'SUCCESS'
    } else {
      this.reqData.filter['isSuccess'] = null
    }

    this.router.navigate([], {
      relativeTo: this.route, queryParams: {
        id: this.reqData.serviceId,
        firstName: this.searchInputForm.value.firstName || null,
        lastName: this.searchInputForm.value.lastName || null,
        pinfl: this.searchInputForm.value.pinfl || null,
        phone: this.searchInputForm.value.phone || null,
        isSuccess: this.searchInputForm.value.isSuccess ? this.searchInputForm.value.isSuccess === 'SUCCESS' : null,
      }
    }).then(() => {
    })

    this.getData()
  }

  clearFilter(): void {
    this.searchInputForm.patchValue({
      firstName: '',
      lastName: '',
      pinfl: '',
      phone: '',
      isSuccess: ''
    })

    this.filter()
  }

  downloadPdf(url: string) {
    window.open(url, '_blanc')
  }

  getData(): void {
    this.loadingList = true
    this.govService.stateServiceHistoryOne(this.reqData).then((res: any) => {
      if (res) {
        this.totalData = {
          usedService: res.usedService,
          successfulAnswers: res.successfulAnswers,
          unsuccessfulAnswers: res.unsuccessfulAnswers,
        }
        this.serviceName = res.serviceName
        this.dataList = res.usedUsersPage.content
        this.totalPages = res.usedUsersPage.paging.totalPages
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  getTodayStatistics(date: Date): void {
    const reqData = {
      from: this.hrService.reqFormatDate(date),
      to: this.hrService.reqFormatDate(date),
      serviceId: this.reqData.serviceId
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.todayStatistics = res
      }
    })
  }

  getPrevMonthStatistics(date: Date) {
    let firstPrevMonthDay = new Date(date.getFullYear(), date.getMonth() - 1, 1)
    let lastPrevMonthDay = new Date(date.getFullYear(), date.getMonth(), 0)
    const reqData = {
      from: this.hrService.reqFormatDate(firstPrevMonthDay),
      to: this.hrService.reqFormatDate(lastPrevMonthDay),
      serviceId: this.reqData.serviceId
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.prevMonthStatistics = res
      }
    })
  }

  getCurrentMonthStatistics(fromDate: Date, toDate: Date): void {
    const reqData = {
      from: this.hrService.reqFormatDate(fromDate),
      to: this.hrService.reqFormatDate(toDate),
      serviceId: this.reqData.serviceId
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.currentMonthStatistics = res
      }
    })
  }

  getCurrentYearStatistics(today: Date): void {
    const reqData = {
      from: `${today.getFullYear()}-01-01`,
      to: this.hrService.reqFormatDate(today),
      serviceId: this.reqData.serviceId
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.currentYearStatistics = res
      }
    })
  }

  getPrevYearStatistics() {
    const date = new Date()
    const firstDay = `${date.getFullYear() - 1}-01-01`
    const lastDay = `${date.getFullYear() - 1}-12-31`

    const reqData = {
      from: firstDay,
      to: lastDay,
      serviceId: this.reqData.serviceId
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.prevYearStatistics = res
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
}
