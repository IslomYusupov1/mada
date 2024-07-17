import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {
  TransactionDetailDialogComponent
} from "../../ad-components/ad-transactions/transaction-detail-dialog/transaction-detail-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";
import {AdStatusDialogComponent} from "../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {AdAgreeDialogComponent} from "../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  TransactionCheckHoldComponent
} from "../../ad-components/ad-transactions/transaction-check-hold/transaction-check-hold.component";
import {
  TransactionConfirmKeyDialogComponent
} from "../../ad-components/ad-transactions/transaction-confirm-key-dialog/transaction-confirm-key-dialog.component";
import {RedemptionDialogComponent} from "../../ad-components/ad-dialog/redemption-dialog/redemption-dialog.component";
import {HrService} from "../../ad-services/helper/hr.service";
import {
  DepositOpenCheckDialogComponent
} from "../../ad-components/ad-dialog/deposit-open-check-dialog/deposit-open-check-dialog.component";
import {
  TransactionCheckS2pComponent
} from "../../ad-components/ad-transactions/transaction-check-s2p/transaction-check-s2p.component";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {
  TransactionLoanToolComponent
} from "../../ad-components/ad-transactions/transaction-loan-tool/transaction-loan-tool.component";

export type TService = {
  id: number,
  title: string
}

type TStatisticsInfoV2 = {
  totalCount: number;
  amount: number
}

type TStatisticsType = "TODAY" | "THIS_MONTH" | "LAST_MONTH" | "THIS_YEAR" | "LAST_YEAR"

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  dataList: Array<any> = []
  typesList: Array<any> = []
  senderTypeList: Array<any> = []
  receiverTypeList: Array<any> = []
  loadingList: boolean = false
  totalDebits: any;
  totalPages: number = 1
  currentPage: number = 1
  totalItems: number = 0
  merchantList: Array<string> = []
  categoryList: Array<{ uuid: string, categoryName: string }> = []
  serviceList: Array<TService> = []
  filteredOptions!: Observable<Array<TService>>
  serviceId!: number | null

  // Period
  isFilter: boolean = false
  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''
  todayTime: Date = new Date
  sevenDaysAgoTime: Date = new Date
  todayStatistics!: TStatisticsInfoV2
  prevMonthStatistics!: TStatisticsInfoV2
  thisMonthStatistics!: TStatisticsInfoV2
  prevYearStatistics!: TStatisticsInfoV2
  currentYearStatistics!: TStatisticsInfoV2

  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  serviceControl = new FormControl({value: '', disabled: true})

  dateForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    pinfl: new FormControl(''),
    merchant: new FormControl(''),
    recipient: new FormControl(''),
    recipientToken: new FormControl(''),
    operationId: new FormControl(''),
    fromAmount: new FormControl(''),
    toAmount: new FormControl(''),
    senderType: new FormControl(''),
    receiverType: new FormControl(''),
    operationType: new FormControl(''),
    status: new FormControl(''),
  })

  topFilterForm: FormGroup = new FormGroup({
    senderType: new FormControl(''),
    receiverType: new FormControl(''),
    operationType: new FormControl(''),
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
    let firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    let firstPrevMonthDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    let lastPrevMonthDay = new Date(today.getFullYear(), today.getMonth(), 0)
    let sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 7)
    this.sevenDaysAgoTime = new Date(today.setHours(0, 0, 0))
    this.todayTime = new Date(today.setHours(23, 59, 59))
    this.reqData.filter['fromTime'] = this.hrService.reqDataWithTime(this.sevenDaysAgoTime)
    this.reqData.filter['toTime'] = this.hrService.reqDataWithTime(this.todayTime)

    this.filteredOptions = this.serviceControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.serviceList.slice();
      }),
    );

    this.getData()
    this.getSenderServiceType()
    this.getRecipientServiceType()
    this.getTransactionTypes()
    this.getThisMonthStatistics(firstDayThisMonth, today)
    this.getPrevMonthStatistics(firstPrevMonthDay, lastPrevMonthDay)
    this.getTodayStatistics(today)
    this.getPrevYearStatistics()
    this.getCurrentYearStatistics(today)
    this.getMerchantList()
    this.getCategoryList()
  }

  private _filter(name: string): Array<TService> {
    const filterValue = name.toLowerCase();

    return this.serviceList.filter(option => option.title.toLowerCase().includes(filterValue));
  }

  openRedemptionDialog(id: string) {
    this.userService.getRedemption(id).then((res: any) => {
      if (res) {
        console.log(res.resultList)
        let dialogRef = this.dialog.open(RedemptionDialogComponent, {
          width: '1200px',
          maxWidth: '1200px',
          data: {
            resultList: res.resultList
          }
        })
        dialogRef.componentInstance.redemption.subscribe(() => {
          dialogRef.close()
        })
      }
    })
  }

  getMerchantList(): void {
    this.userService.operationMerchantList().then((res: any) => {
      if (res) {
        this.merchantList = res.merchantList
      }
    })
  }

  getCategoryList(): void {
    this.userService.operationCategoryList().then((res: any) => {
      if (res) {
        this.categoryList = res.categoryList
      }
    })
  }

  getRecipientListByMerchant(event: any): void {
    if (event.value) {
      this.userService.operationRecipientListByMerchant(event.value).then((res: any) => {
        if (res) {
          this.serviceList = res.services
          this.serviceControl.enable()
        }
      })
    }
  }

  displayFn(service: TService): string {
    return service && service.title ? service.title : '';
  }

  openDepositCheck(id: number): void {
    this.userService.depositOpenCheck(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(DepositOpenCheckDialogComponent, {
          width: '950px',
          maxWidth: '950px',
          maxHeight: '700px',
          data: {
            info: res,
            id
          }
        })
        dialogRef.componentInstance.onTry.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
      }
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

  openRetryDeposit(id: number): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы хотите повторить запрос ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.depositIncreaseTry(id)
    })
  }

  depositIncreaseTry(id: number): void {
    this.userService.depositIncreaseTry(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Запрос успешно отправлен!')
      }
    })
  }

  getTransactionTypes() {
    this.userService.transactionTypesList().then((res: any) => {
      if (res) {
        this.typesList = res
        this.typesList.unshift({
          name: '',
          displayName: 'Все'
        })
      }
    })
  }

  getSenderServiceType() {
    this.userService.transactionServiceTypes('SENDER').then((res: any) => {
      if (res) {
        this.senderTypeList = res
        this.senderTypeList.unshift({
          serviceName: '',
          description: 'Все'
        })
      }
    })
  }

  getRecipientServiceType() {
    this.userService.transactionServiceTypes('RECEIVER').then((res: any) => {
      if (res) {
        this.receiverTypeList = res
        this.receiverTypeList.unshift({
          serviceName: '',
          description: 'Все'
        })
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

  getData() {
    this.loadingList = true
    this.userService.transactionHistory(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalDebits = res.total
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      }
    })
  }

  statisticsSync(type: TStatisticsType) {
    console.log(type)
    this.userService.transactionStatisticsSync({period: type}).then((res: any) => {
      if (res) {

        switch (type) {
          case "LAST_MONTH":
            this.prevMonthStatistics = {
              totalCount: res.totalCount,
              amount: res.amount / 100
            }
            break;
          case "THIS_MONTH":
            this.thisMonthStatistics = {
              totalCount: res.totalCount,
              amount: res.amount / 100
            }
            break;
          case "TODAY":
            this.todayStatistics = {
              totalCount: res.totalCount,
              amount: res.amount / 100
            }
            break;
          case "LAST_YEAR":
            this.prevYearStatistics = {
              totalCount: res.totalCount,
              amount: res.amount / 100
            }
            break;
          case "THIS_YEAR":
            this.currentYearStatistics = {
              totalCount: res.totalCount,
              amount: res.amount / 100
            }
            break;
          default:
            return
        }
      }
    })
  }

  refreshTopFilter(): void {
    this.topFilterForm.patchValue({
      senderType: '',
      receiverType: '',
      operationType: '',
      status: '',
    })
    delete this.reqData.filter['senderService']
    delete this.reqData.filter['recipientService']
    delete this.reqData.filter['transactionType']
    delete this.reqData.filter['status']
    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 20
    this.currentPage = 1
    this.getData()
  }

  getThisMonthStatistics(fromDate: Date, toDate: Date) {
    this.userService.transactionStatisticsV2({period: 'THIS_MONTH'}).then((res: any) => {
      if (res) {
        this.thisMonthStatistics = {
          totalCount: res.totalCount,
          amount: res.amount / 100
        }
      }
    })
  }

  getTodayStatistics(today: Date) {
    this.userService.transactionStatisticsV2({period: 'TODAY'}).then((res: any) => {
      if (res) {
        this.todayStatistics = {
          totalCount: res.totalCount,
          amount: res.amount / 100
        }
      }
    })
  }

  getPrevYearStatistics() {
    this.userService.transactionStatisticsV2({period: 'LAST_YEAR'}).then((res: any) => {
      if (res) {
        this.prevYearStatistics = {
          totalCount: res.totalCount,
          amount: res.amount / 100
        }
      }
    })
  }

  getCurrentYearStatistics(today: Date) {
    this.userService.transactionStatisticsV2({period: 'THIS_YEAR'}).then((res: any) => {
      if (res) {
        this.currentYearStatistics = {
          totalCount: res.totalCount,
          amount: res.amount / 100
        }
      }
    })
  }

  getPrevMonthStatistics(fromDate: Date, toDate: Date) {
    this.userService.transactionStatisticsV2({period: 'LAST_MONTH'}).then((res: any) => {
      if (res) {
        this.prevMonthStatistics = {
          totalCount: res.totalCount,
          amount: res.amount / 100
        }
      }
    })
  }

  exportToExcel(): void {
    localStorage.setItem('loadingCol', '1')
    this.userService.transactionExportToExcel(this.reqData, '/transaction/download/history').subscribe((response) => {
      let blob: any = new Blob([response], {type: "application/octet-stream"})
      const a = document.createElement("a");
      a.download = "transactions.xlsx";
      a.href = URL.createObjectURL(blob);
      a.click();
      localStorage.setItem('loadingCol', '0')
    })
  }

  filterForType(event: any) {
    if (event.value !== '') {
      this.reqData.filter['transactionType'] = event.value
    } else {
      delete this.reqData.filter['transactionType']
    }
    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 20
    this.currentPage = 1
    this.getData()
  }

  filterForSenderType(event: any) {
    if (event.value !== '') {
      this.reqData.filter['senderService'] = event.value
    } else {
      delete this.reqData.filter['senderService']
    }
    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 20
    this.currentPage = 1
    this.getData()
  }

  receiverForSenderType(event: any) {
    if (event.value !== '') {
      this.reqData.filter['recipientService'] = event.value
    } else {
      delete this.reqData.filter['recipientService']
    }
    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 20
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
    this.reqData.paging['size'] = 20
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

    if (this.dateForm.value.recipientToken) {
      this.reqData.filter['recipientToken'] = this.dateForm.value.recipientToken
    } else {
      delete this.reqData.filter['recipientToken']
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

    if (this.dateForm.value.senderType) {
      this.reqData.filter['senderService'] = this.dateForm.value.senderType
    } else {
      delete this.reqData.filter['senderService']
    }

    if (this.dateForm.value.receiverType) {
      this.reqData.filter['recipientService'] = this.dateForm.value.receiverType
    } else {
      delete this.reqData.filter['recipientService']
    }

    if (this.dateForm.value.operationType) {
      this.reqData.filter['transactionType'] = this.dateForm.value.operationType
    } else {
      delete this.reqData.filter['transactionType']
    }

    if (this.dateForm.value.status) {
      this.reqData.filter['status'] = this.dateForm.value.status
    } else {
      delete this.reqData.filter['status']
    }

    if (this.from !== '' && this.to !== '') {
      this.reqData.filter['fromTime'] = this.from
      this.reqData.filter['toTime'] = this.to
    }

    if (this.serviceId) {
      this.reqData.filter['recipientId'] = this.serviceId
    } else {
      delete this.reqData.filter['recipientId']
    }

    this.reqData.paging['page'] = 0
    this.reqData.paging['size'] = 20
    this.currentPage = 1
    this.getData()
  }

  logger(event: any) {
    this.serviceId = event.option.value.id
  }

  refreshFilter() {
    this.reqData = {
      filter: {
        fromTime: this.hrService.reqDataWithTime(this.sevenDaysAgoTime),
        toTime: this.hrService.reqDataWithTime(this.todayTime)
      },
      paging: {
        page: 0,
        size: 20
      }
    }
    this.dateForm.patchValue({
      from: '',
      to: '',
      firstName: '',
      lastName: '',
      phone: '',
      pinfl: '',
      operationId: '',
      fromAmount: '',
      merchant: '',
      toAmount: '',
      recipientToken: '',
      recipient: '',
      senderType: '',
      receiverType: '',
      operationType: '',
      status: '',
    })
    this.serviceControl.patchValue('')
    this.serviceId = null
    this.serviceControl.disable()
    this.currentPage = 1
    this.selectedFilterBtn = 'allPeriod'
    this.from = ''
    this.to = ''

    this.getData()
  }

  returnDate(from: Date) {
    let year = from.getFullYear()
    let month = (from.getMonth() + 1) > 9 ? from.getMonth() + 1 : `0${from.getMonth() + 1}`
    let date = from.getDate() > 9 ? from.getDate() : `0${from.getDate()}`
    return `${year}-${month}-${date}`
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

  openCheckHoldDialog(uuid: string, operationType: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите проверить статус??'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      if (operationType === 'Service2P') {
        this.checkS2PHoldStatus(uuid)
      } else {
        this.checkHoldStatus(uuid)
      }
    })
  }

  openChangeStatusDialog(uuid: string, type: string) {
    let dialogRef = this.dialog.open(TransactionConfirmKeyDialogComponent, {
      width: '450px',
      maxWidth: '450px'
    })
    dialogRef.componentInstance.onConfirm.subscribe(() => {
      dialogRef.close()
      this.openConfirmKeyStatus(uuid, type)
    })
  }

  openConfirmKeyStatus(uuid: string, type: string) {
    let dataTitle: string;
    switch (type) {
      case 'LOAN_CONFIRM':
        dataTitle = 'Вы действительно хотите подтвердить этот платеж по кредиту?';
        break;
      case 'TRANSACTION_HOLD':
        dataTitle = 'Вы действительно хотите подтвердить эту транзакцию?';
        break;
      case 'STATUS_CHANGE':
        dataTitle = 'Вы действительно хотите изменить статус на «Успешно» ?';
        break;
      default:
        dataTitle = '???'
    }
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: dataTitle
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      if (type === 'LOAN_CONFIRM') {
        this.loanConfirmPayment(uuid)
      } else if (type === 'TRANSACTION_HOLD') {
        this.transactionConfirmHold(uuid)
      } else if (type === 'STATUS_CHANGE') {
        this.changeLoanStatus(uuid)
      }
    })
  }

  changeLoanStatus(uuid: string) {
    this.userService.loanTransactionStatusChange(uuid).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Статус успешно изменен на "Успешно"')
        this.getData()
      }
    })
  }

  loanConfirmPayment(uuid: string) {
    this.userService.loanConfirmPayment(uuid).then((res: any) => {
      if (res) {
        this.showMessage(true, res.status)
        this.getData()
      }
    })
  }

  transactionConfirmHold(uuid: string) {
    this.userService.transactionConfirmHold(uuid).then((res: any) => {
      if (res) {
        this.showMessage(true, res.status)
        this.getData()
      }
    })
  }

  checkHoldStatus(uuid: string) {
    this.userService.transactionCheckHold(uuid).then((res: any) => {
      if (res) {
        this.dialog.open(TransactionCheckHoldComponent, {
          width: '450px',
          maxWidth: '450px',
          data: {
            info: res
          }
        })
      }
    })
  }

  checkS2PHoldStatus(uuid: string) {
    this.userService.transactionS2PCheck(uuid).then((res: any) => {
      if (res) {
        this.dialog.open(TransactionCheckS2pComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            info: res
          }
        })
      }
    })
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
    // @ts-ignore
    this.reqData.paging.page--
    this.currentPage--
    this.getData()
  }

  pageNextTo() {
    // @ts-ignore
    this.reqData.paging.page++
    this.currentPage++
    this.getData()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
