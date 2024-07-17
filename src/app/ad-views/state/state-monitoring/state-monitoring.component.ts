import {Component, OnInit} from '@angular/core';
import {GovernmentService} from "../../../ad-services/payment/government.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {from, fromEvent, Observable} from "rxjs";
import {delay, distinctUntilChanged, filter, pluck, switchMap, toArray} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

export type TStatistics = {
  usedService: number;
  unsuccessfulAnswers: number;
  successfulAnswers: number
}

@Component({
  selector: 'app-state-monitoring',
  templateUrl: './state-monitoring.component.html',
  styleUrls: ['./state-monitoring.component.scss']
})
export class StateMonitoringComponent implements OnInit {
  loadingList: boolean = false
  currentPage: number = 1
  totalPages: number = 1
  searchType: string = 'Все'
  showFilters: boolean = false

  totalData!: TStatistics
  todayStatistics!: TStatistics
  prevMonthStatistics!: TStatistics
  currentMonthStatistics!: TStatistics
  prevYearStatistics!: TStatistics
  currentYearStatistics!: TStatistics

  serviceList: Array<string> = []
  searchResult$!: Observable<Array<string>>
  dataList: Array<any> = []
  reqData: any = {
    paging: {
      page: 0,
      size: 10
    },
    filter: {
      firstName: null,
      isSuccess: null,
      lastName: null,
      phone: null,
      pinfl: null,
      serviceName: null,
      serviceType: null
    }
  }
  serviceTypeList: Array<any> = []

  filterForm: FormGroup = this.fb.group({
    serviceName: '',
    serviceType: '',
    firstName: '',
    lastName: '',
    phone: '',
    pinfl: '',
    isSuccess: '',
  })

  constructor(
    private govService: GovernmentService,
    private hrService: HrService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const today: Date = new Date()
    let firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const search = document.querySelector('#search') as HTMLElement
    this.searchResult$ = fromEvent(search, 'input').pipe(
      pluck('target', 'value'),
      distinctUntilChanged(),
      switchMap((searchTerm: any) => this.searchServiceNames(searchTerm.toLowerCase()))
    )

    // Statistics
    this.getPrevYearStatistics()
    this.getCurrentYearStatistics(today)
    this.getPrevMonthStatistics(today)
    this.getCurrentMonthStatistics(firstDayThisMonth, today)
    this.getTodayStatistics(today)

    this.getTypeList()
    this.getServiceNameList()
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.govService.stateServiceHistory(this.reqData).then((res: any) => {
      if (res) {
        this.totalData = {
          usedService: res.usedService,
          successfulAnswers: res.successfulAnswers,
          unsuccessfulAnswers: res.unsuccessfulAnswers,
        }
        this.dataList = res.serviceListPage.content
        this.totalPages = res.serviceListPage.paging.totalPages
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  searchServiceNames(searchTerm: string): Observable<Array<string>> {
    return from(this.serviceList).pipe(
      delay(100),
      filter((item) => item.toLocaleLowerCase().indexOf(searchTerm) !== -1),
      toArray()
    )
  }

  filter(): void {
    if (!this.filterForm.value.firstName && !this.filterForm.value.lastName && !this.filterForm.value.isSuccess
      && !this.filterForm.value.pinfl && !this.filterForm.value.phone && !this.filterForm.value.serviceName && !this.filterForm.value.serviceType
      && Object.keys(this.reqData.filter).length === 0) {
      return
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    if (this.filterForm.value.serviceName) {
      this.reqData.filter['serviceName'] = this.filterForm.value.serviceName
    } else {
      this.reqData.filter['serviceName'] = null
    }

    if (this.filterForm.value.firstName) {
      this.reqData.filter['firstName'] = this.filterForm.value.firstName
    } else {
      this.reqData.filter['firstName'] = null
    }

    if (this.filterForm.value.lastName) {
      this.reqData.filter['lastName'] = this.filterForm.value.lastName
    } else {
      this.reqData.filter['lastName'] = null
    }

    if (this.filterForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.filterForm.value.pinfl
    } else {
      this.reqData.filter['pinfl'] = null
    }

    if (this.filterForm.value.phone) {
      this.reqData.filter['phone'] = this.filterForm.value.phone
    } else {
      this.reqData.filter['phone'] = null
    }

    if (this.filterForm.value.isSuccess) {
      this.reqData.filter['isSuccess'] = this.filterForm.value.isSuccess === 'SUCCESS'
    } else {
      this.reqData.filter['isSuccess'] = null
    }

    if (!this.filterForm.value.serviceType || this.filterForm.value.serviceType === 'Все') {
      this.reqData.filter['serviceType'] = null
    } else {
      this.reqData.filter['serviceType'] = this.filterForm.value.serviceType
    }

    this.getData()
  }

  clearFilter(): void {
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.filterForm.patchValue({
      serviceName: '',
      serviceType: '',
      firstName: '',
      lastName: '',
      phone: '',
      pinfl: '',
      isSuccess: '',
    })

    this.filter()
  }

  routeTo(uuid: string) {
    this.router.navigate(
      ['/state/monitoring/one'],
      {
        queryParams: {
          id: uuid,
          firstName: this.reqData.filter.firstName,
          lastName: this.reqData.filter.lastName,
          phone: this.reqData.filter.phone,
          pinfl: this.reqData.filter.pinfl,
          isSuccess: this.reqData.filter.isSuccess
        }
      }).then(() => {
    })
  }

  getTodayStatistics(date: Date): void {
    const reqData = {
      from: this.hrService.reqFormatDate(date),
      to: this.hrService.reqFormatDate(date)
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
    }
    this.govService.stateServiceHistoryStatistics(reqData).then((res: any) => {
      if (res) {
        this.currentMonthStatistics = res
      }
    })
  }

  getTypeList(): void {
    this.govService.stateServiceTypeList().then((res) => {
      if (res) {
        this.serviceTypeList = res.serviceTypes
        this.serviceTypeList.unshift('Все')
      }
    })
  }

  getServiceNameList(): void {
    this.govService.stateServiceNameList().then((res: any) => {
      if (res) {
        this.serviceList = res.serviceName
      }
    })
  }

  getCurrentYearStatistics(today: Date): void {
    const reqData = {
      from: `${today.getFullYear()}-01-01`,
      to: this.hrService.reqFormatDate(today),
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

    let reqData = {
      from: firstDay,
      to: lastDay
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
