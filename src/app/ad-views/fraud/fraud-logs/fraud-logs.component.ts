import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FraudService} from "../../../ad-services/fraud.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fraud-logs',
  templateUrl: './fraud-logs.component.html',
  styles: []
})
export class FraudLogsComponent implements OnInit {

  dataList: Array<any> = []
  showFilter: boolean = false
  loadingList: boolean = false
  actionTypeList: Array<string> = []
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    paging: {
      page: 0,
      size: 10
    },
    params: {}
  }

  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''

  filterForm: FormGroup = this.fb.group({
    actionType: '',
    username: '',
    deviceId: ''
  })

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    public fraudService: FraudService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
    this.getActionTypeList()
  }

  getList() {
    this.loadingList = true
    this.fraudService.getFraudLogsList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.dataList.forEach((item, index) => {
          item.position = (this.reqData.paging.page * this.reqData.paging.size) + (index + 1)
        })
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  getActionTypeList(): void {
    this.fraudService.getFraudActionTypeList().then((res: any) => {
      if (res) {
        this.actionTypeList = res.actionTypeList
      } else {
        this.actionTypeList = []
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

  search(): void {
    if (!this.getRequestAdd() && !this.getFormValueBool()) {
      return
    }
    if (this.getFormValueBool()) {
      this.reqData.paging.page = 0
      this.currentPage = 1

      if (this.from && this.to) {
        this.reqData.params['fromTime'] = this.from
        this.reqData.params['toTime'] = this.to
      }

      if (this.filterForm.value.username) {
        this.reqData.params['username'] = this.filterForm.value.username
      } else {
        delete this.reqData.params['username']
      }

      if (this.filterForm.value.actionType) {
        this.reqData.params['actionType'] = this.filterForm.value.actionType
      } else {
        delete this.reqData.params['actionType']
      }

      if (this.filterForm.value.deviceId) {
        this.reqData.params['deviceId'] = this.filterForm.value.deviceId
      } else {
        delete this.reqData.params['deviceId']
      }

      this.getList()
    } else if (this.getRequestAdd() && !this.getFormValueBool()) {
      this.reqData = {
        paging: {
          page: 0,
          size: 10
        },
        params: {}
      }
      this.currentPage = 1
      this.getList()
    }
  }

  clearFilter(): void {
    if (this.getFormValueBool() || this.getRequestAdd()) {
      this.filterForm.patchValue({
        deviceId: '',
        username: '',
        actionType: '',
      })
      this.from = ''
      this.to = ''
      this.selectedFilterBtn = 'allPeriod'
      this.reqData = {
        paging: {
          page: 0,
          size: 10
        },
        params: {}
      }
      this.currentPage = 1
      this.getList()
    }
  }

  getFormValueBool(): boolean {
    return (this.filterForm.value.username || this.filterForm.value.deviceId || this.filterForm.value.actionType || this.from || this.to)
  }

  getRequestAdd(): boolean {
    return (this.reqData.params.username || this.reqData.params.fromTime || this.reqData.params.toTime || this.reqData.params.deviceId || this.reqData.params.actionType)
  }

  // Period time buttons
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

  // Pagination
  pageClicked(val: number) {
    if (this.currentPage !== val) {
      this.reqData.paging.page = val - 1
      this.currentPage = val
      this.getList()
    }
  }

  pagePrevTo() {
    this.reqData.paging.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    this.reqData.paging.page++
    this.currentPage++
    this.getList()
  }
}
