import {Component, OnInit} from '@angular/core';
import {PaynetService} from "../../../ad-services/paynet.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../ad-services/user.service";

@Component({
  selector: 'app-cashback-history',
  templateUrl: './cashback-history.component.html',
  styleUrls: ['./cashback-history.component.scss']
})
export class CashbackHistoryComponent implements OnInit {
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
  isFilter: boolean = false
  showDateSettings: boolean = false
  from: string = ''
  to: string = ''
  phone: string = ''
  operationId: string = ''
  ident: string = ''
  yesterdayBtn: boolean = false
  todayBtn: boolean = false
  prevMonthBtn: boolean = false
  monthBtn: boolean = false
  settingsBtn: boolean = false

  dateForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  })

  constructor(
    private paymentService: PaynetService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
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
    this.paymentService.cashbackHistory(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loading = false
      }
    })
  }

  setFilterDate(day: string) {
    let startDay = new Date()
    switch (day) {
      case "today":
        this.setBtnStyle("today")
        let startDate = new Date(new Date().setDate(startDay.getDate()))
        this.fromDateFormat(startDate)
        this.toDateFormat(startDate)
        break;
      case "yesterday":
        this.setBtnStyle("yesterday")
        let startYesterday = new Date(new Date().setDate(startDay.getDate() - 1))
        let endYesterday = new Date(new Date().setDate(startDay.getDate() - 1))
        this.fromDateFormat(startYesterday)
        this.toDateFormat(endYesterday)
        break;
      case "prevMonth":
        this.setBtnStyle("prevMonth")
        let firstPrevMonthDay = new Date(startDay.getFullYear(), startDay.getMonth() - 1, 1)
        let lastPrevMonthDay = new Date(startDay.getFullYear(), startDay.getMonth(), 0)
        this.fromDateFormat(firstPrevMonthDay)
        this.toDateFormat(lastPrevMonthDay)
        break;
      case "month":
        this.setBtnStyle("month")
        let firstDay = new Date(startDay.getFullYear(), startDay.getMonth(), 1)
        let to = new Date()
        this.fromDateFormat(firstDay)
        this.toDateFormat(to)
        break;
      default:
        this.from = ''
        this.to = ''
        break;
    }
  }

  showSettings(btn: string) {
    this.setBtnStyle(btn)
    this.showDateSettings = true
  }

  setBtnStyle(btn: string) {
    switch (btn) {
      case "today":
        this.todayBtn = true
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        this.showDateSettings = false
        break;
      case "yesterday":
        this.todayBtn = false
        this.yesterdayBtn = true
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        this.showDateSettings = false
        break;
      case "prevMonth":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = true
        this.monthBtn = false
        this.settingsBtn = false
        this.showDateSettings = false
        break;
      case "month":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = true
        this.settingsBtn = false
        this.showDateSettings = false
        break;
      case "settings":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = true
        break;
      default:
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        break;
    }
  }

  periodResult() {
    if (this.showDateSettings) {
      if (this.dateForm.value.from === '') {
        this.showMessage(false, 'Укажите начальную дату')
      } else if (this.dateForm.value.to === '') {
        this.showMessage(false, 'Укажите окончательную дату')
      } else {
        this.reqData.filter['dateFrom'] = this.dateForm.value.from
        this.reqData.filter['dateTo'] = this.dateForm.value.to

        if (this.phone !== '') {
          this.reqData.filter['phone'] = this.phone
        } else {
          delete this.reqData.filter['phone']
        }
        if (this.ident !== '') {
          this.reqData.filter['ident'] = this.ident
        } else {
          delete this.reqData.filter['ident']
        }
        if (this.operationId !== '') {
          this.reqData.filter['operationId'] = this.operationId
        } else {
          delete this.reqData.filter['operationId']
        }

        this.getData()
      }
    } else {
      if (this.from !== '' && this.to !== '') {
        this.reqData.filter['dateFrom'] = this.from
        this.reqData.filter['dateTo'] = this.to
      } else {
        delete this.reqData.filter['dateFrom']
        delete this.reqData.filter['dateTo']
      }
      if (this.phone !== '') {
        this.reqData.filter['phone'] = this.phone
      } else {
        delete this.reqData.filter['phone']
      }
      if (this.ident !== '') {
        this.reqData.filter['ident'] = this.ident
      } else {
        delete this.reqData.filter['ident']
      }
      if (this.operationId !== '') {
        this.reqData.filter['operationId'] = this.operationId
      } else {
        delete this.reqData.filter['operationId']
      }
      this.getData()
    }
  }

  refreshFilter() {
    this.dateForm.patchValue({
      from: '',
      to: ''
    })
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 10
      }
    }
    this.setBtnStyle('default')
    this.from = ''
    this.to = ''
    this.operationId = ''
    this.phone = ''
    this.ident = ''
    this.currentPage = 1

    this.getData()
  }

  statusFilter(event: any) {
    if (event.value !== '') {
      this.reqData.filter['status'] = event.value
    } else {
      delete this.reqData.filter['status']
    }
    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 0
    this.currentPage = 1

    this.getData()
  }

  fromDateFormat(from: Date) {
    let year = from.getFullYear()
    let month = (from.getMonth() + 1) > 9 ? from.getMonth() + 1 : `0${from.getMonth() + 1}`
    let date = from.getDate() > 9 ? from.getDate() : `0${from.getDate()}`
    this.from = `${year}-${month}-${date}`
  }

  toDateFormat(to: Date) {
    let year = to.getFullYear()
    let month = (to.getMonth() + 1) > 9 ? to.getMonth() + 1 : `0${to.getMonth() + 1}`
    let date = to.getDate() > 9 ? to.getDate() : `0${to.getDate()}`
    this.to = `${year}-${month}-${date}`
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
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
