import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-user-promo-code',
  templateUrl: './user-promo-code.component.html',
  styleUrls: ['./user-promo-code.component.scss']
})
export class UserPromoCodeComponent implements OnInit {
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems: number = 0;
  from: string = ''
  to: string = ''
  showFilter: boolean = false
  selectedFilterBtn: string = ''
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  statusList: Array<string> = [
    'ALL',
    'CONFIRM',
    'PREPARE'
  ]

  filterForm: FormGroup = this.fb.group({
    promoCode: '',
    userPhone: '',
    pinfl: '',
    empId: null,
    status: 'ALL'
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private hrService: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  public getData(): void {
    this.loadingList = true
    this.userService.userPromoCodeFilterList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach((el, i) => {
          el.position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1)
          el.data = this.hrService.reqDataWithTime(el.activatedAt)
        })
        this.totalItems = res.paging.totalItems
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      } else {
        this.dataList = []
        this.totalItems = 0
        this.totalPages = 0
        this.loadingList = false
      }
    }).catch(e => {
      console.log(e)
      this.dataList = []
      this.totalItems = 0
      this.totalPages = 0
      this.loadingList = false
    })
  }

  public setTime(event: any) {
    this.selectedFilterBtn = ''
    this.from = event.fromTime
    this.to = event.toTime
  }

  public setFromTime(event: string) {
    this.selectedFilterBtn = ''
    this.from = event ? event : ''
  }

  public setToTime(event: string) {
    this.selectedFilterBtn = ''
    this.to = event ? event : ''
  }

  public filter(): void {
    if (!this.checkFormData() && !this.checkReqData()) {
      return
    }

    if (this.filterForm.value['promoCode']) {
      this.reqData.filter['promoCode'] = this.filterForm.value['promoCode']
    } else {
      delete this.reqData.filter['promoCode']
    }

    if (this.filterForm.value['userPhone']) {
      this.reqData.filter['userPhone'] = this.filterForm.value['userPhone']
    } else {
      delete this.reqData.filter['userPhone']
    }

    if (this.filterForm.value['pinfl']) {
      this.reqData.filter['pinfl'] = this.filterForm.value['pinfl']
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.filterForm.value['empId']) {
      this.reqData.filter['empId'] = this.filterForm.value['empId']
    } else {
      delete this.reqData.filter['empId']
    }

    if (this.filterForm.value['status'] !== 'ALL') {
      this.reqData.filter['status'] = this.filterForm.value['status']
    } else {
      delete this.reqData.filter['status']
    }

    if (this.from !== '' && this.to !== '') {
      this.reqData.filter.fromTime = this.from
      this.reqData.filter.toTime = this.to
    } else {
      delete this.reqData.filter['fromTime']
      delete this.reqData.filter['toTime']
    }

    this.currentPage = 1
    this.reqData.paging['page'] = 0
    this.getData()
  }

  public clearFilter(): void {
    if (!this.checkFormData() && !this.checkReqData()) {
      return
    }

    this.to = ''
    this.from = ''
    this.selectedFilterBtn = 'allPeriod'
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 10
      }
    }
    this.filterForm.patchValue({
      promoCode: '',
      userPhone: '',
      pinfl: '',
      empId: null,
      status: 'ALL'
    })
    this.currentPage = 1
    this.getData()
  }

  private checkReqData(): boolean {
    return this.reqData.filter['promoCode'] || this.reqData.filter['userPhone'] || this.reqData.filter['pinfl'] || this.reqData.filter['empId'] || this.reqData.filter['status'] || (this.from !== '' && this.to !== '')
  }

  private checkFormData(): boolean {
    return this.filterForm.value['promoCode'] || this.filterForm.value['userPhone'] || this.filterForm.value['pinfl'] || this.filterForm.value['empId'] || this.filterForm.value['status'] !== 'ALL'
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
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
}
