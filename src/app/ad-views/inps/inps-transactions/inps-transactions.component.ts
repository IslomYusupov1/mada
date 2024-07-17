import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {
  TransactionDetailDialogComponent
} from "../../../ad-components/ad-transactions/transaction-detail-dialog/transaction-detail-dialog.component";
import {UserService} from "../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {FormControl, FormGroup} from "@angular/forms";
import {
  TransactionLoanToolComponent
} from "../../../ad-components/ad-transactions/transaction-loan-tool/transaction-loan-tool.component";

@Component({
  selector: 'app-inps-transactions',
  templateUrl: './inps-transactions.component.html',
  styles: [`
    .btn-green {
      background-color: #3F6D5B;
      color: #ffffff;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 3px !important;
    }

    .table-statistics {
      display: flex;
      align-items: center;
      gap: 8px;

      span:first-child {
        font-weight: 600;
      }

      span:last-child {
        margin-left: 6px;
        font-weight: 600;
        color: #3F6D5B;
      }
    }

    .export-btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #3F6D5B;
      background-color: #FFFFFF;
      border: 1px solid #3F6D5B;
      font-size: 16px;
      padding: 8px 16px;
      font-weight: 400;
    }
  `]
})
export class InpsTransactionsComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalDebits: any;
  totalPages: number = 1
  currentPage: number = 1
  totalItems: number = 0

  // Period
  isFilter: boolean = false
  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''
  todayTime: Date = new Date
  sevenDaysAgoTime: Date = new Date

  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }


  dateForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    pinfl: new FormControl(''),
    operationId: new FormControl(''),
    fromAmount: new FormControl(''),
    toAmount: new FormControl(''),
  })

  topFilterForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    status: new FormControl(''),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private hrService: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    const today: Date = new Date()
    let sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 7)
    this.sevenDaysAgoTime = new Date(sevenDaysAgo.setHours(0, 0, 0))
    this.todayTime = new Date(today.setHours(23, 59, 59))
    this.reqData.filter['fromTime'] = this.hrService.reqDataWithTime(this.sevenDaysAgoTime)
    this.reqData.filter['toTime'] = this.hrService.reqDataWithTime(this.todayTime)

    this.getData()
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

  getData() {
    this.loadingList = true
    this.userService.inpsTransactionHistory(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalDebits = res.total
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      }
    })
  }

  refreshTopFilter(): void {
    this.topFilterForm.patchValue({
      type: '',
      status: '',
    })
    delete this.reqData.filter['type']
    delete this.reqData.filter['status']
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  filterForType(event: any) {
    if (event.value !== '') {
      this.reqData.filter['type'] = event.value
    } else {
      delete this.reqData.filter['type']
    }
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  exportToExcel(): void {
    localStorage.setItem('loadingCol', '1')
    this.userService.inpsTransactionExportToExcel(this.reqData, '/inps/history/download').subscribe((response) => {
      let blob: any = new Blob([response], {type: "application/octet-stream"})
      const a = document.createElement("a");
      a.download = "transactions.xlsx";
      a.href = URL.createObjectURL(blob);
      a.click();
      localStorage.setItem('loadingCol', '0')
    })
  }

  statusFilter(event: any) {
    if (event.value !== '') {
      this.reqData.filter['status'] = event.value
    } else {
      delete this.reqData.filter['status']
    }
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  periodResult() {
    if (this.dateForm.value.firstName) {
      this.reqData.filter['firstName'] = this.dateForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }
    if (this.dateForm.value.phone) {
      this.reqData.filter['phone'] = this.dateForm.value.phone
    } else {
      delete this.reqData.filter['phone']
    }
    if (this.dateForm.value.lastName) {
      this.reqData.filter['lastName'] = this.dateForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }
    if (this.dateForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.dateForm.value.pinfl
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.dateForm.value.operationId) {
      this.reqData.filter['operationId'] = this.dateForm.value.operationId
    } else {
      delete this.reqData.filter['operationId']
    }


    if (this.dateForm.value.fromAmount) {
      this.reqData.filter['fromAmount'] = Number(this.dateForm.value.fromAmount) * 100
    } else {
      delete this.reqData.filter['fromAmount']
    }

    if (this.dateForm.value.toAmount) {
      this.reqData.filter['toAmount'] = Number(this.dateForm.value.toAmount) * 100
    } else {
      delete this.reqData.filter['toAmount']
    }

    if (this.from !== '' && this.to !== '') {
      this.reqData.filter['fromTime'] = this.from
      this.reqData.filter['toTime'] = this.to
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  refreshFilter() {
    delete this.reqData.filter['firstName']
    delete this.reqData.filter['phone']
    delete this.reqData.filter['lastName']
    delete this.reqData.filter['operationId']
    delete this.reqData.filter['fromAmount']
    delete this.reqData.filter['toAmount']
    delete this.reqData.filter['pinfl']
    this.reqData.filter['fromTime'] = this.hrService.reqDataWithTime(this.sevenDaysAgoTime)
    this.reqData.filter['toTime'] = this.hrService.reqDataWithTime(this.todayTime)
    this.reqData.paging['page'] = 0
    this.dateForm.patchValue({
      from: '',
      to: '',
      firstName: '',
      lastName: '',
      phone: '',
      pinfl: '',
      operationId: '',
      fromAmount: '',
      toAmount: '',
    })
    this.currentPage = 1
    this.selectedFilterBtn = 'allPeriod'
    this.from = ''
    this.to = ''

    this.getData()
  }

  openDetailsDialog(item: any) {
    this.dialog.open(TransactionDetailDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        transactionInfo: item
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  paymentToolCheck(id: number, uuid: string, operationType: string, status: string, recipientService: string, senderService: string): void {
    this.dialog.open(TransactionLoanToolComponent, {
      width: '800px',
      height: '95%',
      data: {
        id,
        uuid,
        operationType,
        status,
        recipientService,
        senderService,
        cause: 'prepare'
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
