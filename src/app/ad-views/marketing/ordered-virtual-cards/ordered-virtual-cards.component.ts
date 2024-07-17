import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MarketingService} from "../../../ad-services/marketing.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {
  VirtualCardDetailsComponent
} from "../../../ad-components/ad-marketing/virtual-card/virtual-card-details/virtual-card-details.component";

type TStatus = {
  value: string,
  text: string
}

@Component({
  selector: 'app-ordered-virtual-cards',
  templateUrl: './ordered-virtual-cards.component.html',
  styleUrls: ['./ordered-virtual-cards.component.scss']
})
export class OrderedVirtualCardsComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    pinfl: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl('')
  })
  loadingList: boolean = false
  dataList: Array<any> = []
  statusList: Array<TStatus> = []
  totalPages: number = 0
  currentPage: number = 1
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10,
    }
  }

  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''

  constructor(
    private dialog: MatDialog,
    private marketingService: MarketingService,
    public hrService: HrService,
    private router: Router
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
    this.getOrderVirtualCardStatus()
  }

  getData() {
    this.loadingList = true
    this.marketingService.getVirtualOrderedCardList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1)
          this.dataList[i].class = this.hrService.getOrderVirtualCardStatusClass(this.dataList[i].status)
        }
        this.loadingList = false
      }
    })
  }

  getOrderVirtualCardStatus() {
    this.marketingService.getVirtualCardStatusList().then((res: any) => {
      if (res) {
        const list = res
        let content: TStatus[] = []
        for (let i = 0; i < list.length; i++) {
          let value, text;
          value = list[i]
          text = this.hrService.getVirtualCardStatus(list[i])
          content.push({value, text})
        }
        this.statusList = content
        this.statusList.unshift({value: '', text: 'Все'})
      }
    })
  }

  filterByStatus(event: any) {
    if (event.value !== '') {
      this.reqData.filter['status'] = event.value
      this.reqData.paging['page'] = 0
      this.currentPage = 1
      this.getData()
    } else {
      if (this.reqData.filter.status) {
        delete this.reqData.filter['status']
        this.reqData.paging['page'] = 0
        this.getData()
      }
    }
  }

  showResult() {
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    if (this.from && this.to) {
      this.reqData.filter['fromTime'] = this.from
      this.reqData.filter['toTime'] = this.to
    }
    if (this.filterForm.value.pinfl){
      this.reqData.filter['pinfl'] = this.filterForm.value.pinfl
    }
    else {
      delete this.reqData.filter['pinfl']
    }
    if (this.filterForm.value.phone){
      this.reqData.filter['phone'] = this.filterForm.value.phone
    }
    else {
      delete this.reqData.filter['phone']
    }
    if (this.filterForm.value.lastName){
      this.reqData.filter['lastName'] = this.filterForm.value.lastName
    }
    else {
      delete this.reqData.filter['lastName']
    }
    if (this.filterForm.value.firstName){
      this.reqData.filter['firstName'] = this.filterForm.value.firstName
    }
    else {
      delete this.reqData.filter['firstName']
    }
    this.getData()
  }

  refreshResult() {
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.selectedFilterBtn = 'allPeriod'
    this.filterForm.patchValue({
      firstName: '',
      lastName: '',
      phone: '',
      pinfl: '',
    })
    delete this.reqData.filter['pinfl']
    delete this.reqData.filter['phone']
    delete this.reqData.filter['lastName']
    delete this.reqData.filter['firstName']
    delete this.reqData.filter['fromTime']
    delete this.reqData.filter['toTime']

    this.getData()
  }

  openDetailsDialog(item: any): void {
    this.dialog.open(VirtualCardDetailsComponent, {
      width: '600px',
      maxWidth: '600px',
      maxHeight: '700px',
      data: {
        item
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

  pageClicked(val: number) {
    if (val !== this.currentPage) {
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
