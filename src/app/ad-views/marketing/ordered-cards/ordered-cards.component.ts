import {Component, OnInit} from '@angular/core';
import {MarketingService} from "../../../ad-services/marketing.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  OrderedCardDetailsComponent
} from "../../../ad-components/ad-marketing/ordered-card/ordered-card-details/ordered-card-details.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {
  OrderedCardChangeStatusComponent
} from "../../../ad-components/ad-marketing/ordered-card/ordered-card-change-status/ordered-card-change-status.component";
import {
  OrderedCardUpdateReasonComponent
} from "../../../ad-components/ad-marketing/ordered-card/ordered-card-update-reason/ordered-card-update-reason.component";

type TStatus = {
  value: string,
  text: string
}

@Component({
  selector: 'app-ordered-cards',
  templateUrl: './ordered-cards.component.html',
  styleUrls: ['./ordered-cards.component.scss']
})

export class OrderedCardsComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  statusList: Array<any> = []
  totalPages: number = 0
  currentPage: number = 1
  reqData: any = {
    page: 0,
    size: 10,
  }

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
    this.getOrderCardStatus()
  }

  getData() {
    this.loadingList = true
    this.marketingService.getCardOrderList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        for (let i = 0; i < this.dataList.length; i++) {
          this.dataList[i].class = this.hrService.getOrderCardStatusClass(this.dataList[i].status)
        }
        this.loadingList = false
      }
    })
  }

  filterByStatus(event: any) {
    if (event.value !== '') {
      this.reqData['status'] = event.value
      this.reqData['page'] = 0
      this.currentPage = 1
      this.getData()
    } else {
      if (this.reqData.status) {
        delete this.reqData['status']
        this.getData()
      }
    }
  }

  getOrderCardStatus() {
    this.marketingService.getOrderCardStatus().then((res: any) => {
      if (res) {
        const list = res.statusList
        let content: TStatus[] = []
        for (let i = 0; i < list.length; i++) {
          let value, text;
          value = list[i]
          text = this.hrService.getOrderCardStatus(list[i])

          content.push({value, text})
        }
        this.statusList = content
        this.statusList.unshift({value: '',text: 'Все'})
      }
    })
  }

  openOrderCardDetails(uuid: string) {
    this.marketingService.getOrderCardOne(uuid).then((res: any) => {
      if (res) {
        this.dialog.open(OrderedCardDetailsComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            info: res
          }
        })
      }
    })
  }

  openChangeStatusDialog(item: any) {
    let dialogRef = this.dialog.open(OrderedCardChangeStatusComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        info: item,
        statusList: this.statusList
      }
    })
    dialogRef.componentInstance.onUpdate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openLogsDialog(item: Array<any>) {
    this.dialog.open(OrderedCardUpdateReasonComponent, {
      width: '1000px',
      maxWidth: '1000px',
      data: {
        logs: item
      }
    })
  }

  pageClicked(val: number) {
    if (val !== this.currentPage) {
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
