import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoanService} from "../../../ad-services/loan.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  LoanAppGetDialogComponent
} from "../../../ad-components/ad-dialog/loan-app-get-dialog/loan-app-get-dialog.component";
import {DetailLoanAppComponent} from "../../../ad-components/ad-dialog/detail-loan-app/detail-loan-app.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {LoanStatisticsItemComponent} from "./loan-statistics-item/loan-statistics-item.component";

@Component({
  selector: 'app-product-loan-app',
  templateUrl: './product-loan-app.component.html',
  styles: []
})
export class ProductLoanAppComponent implements OnInit {
  showFilter: boolean = false
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems: number = 0;
  reqData: any = {
    page: 0,
    size: 10
  }
  filter: any = {
    loanApplicationStatus: null,
    applicationState: null,
    loanApplicationStep: null,
    absApplicationState: null,
    fromTime: '',
    toTime: '',
    phone: '',
    passport: '',
    pinfl: '',
    lastName: '',
    firstName: '',
    clientCode: ''
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private loanService: LoanService,
    private hr: HrService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  getOrder(index: number) {
    return (this.currentPage - 1) * 10 + (index + 1)
  }

  clearAll() {
    this.currentPage = 1;
    this.reqData = {
      page: 0,
      size: 10
    }
    this.filter = {
      loanApplicationStatus: null,
      applicationState: null,
      loanApplicationStep: null,
      absApplicationState: null,
      fromTime: '',
      toTime: '',
      phone: '',
      passport: '',
      pinfl: '',
      lastName: '',
      firstName: '',
      clientCode: ''
    }
    this.getList()
  }

  // openAgreeDialogBeforeSend(): void {
  //   let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
  //     data: {
  //       title: 'Вы  дейстивельно хотите отправить данные ?'
  //     }
  //   })
  //   dialogRef.componentInstance.onAgree.subscribe(() => {
  //     dialogRef.close()
  //     this.getLoanAppStatisticsItem()
  //   })
  // }

  getLoanAppStatisticsItem(): void {
    this.loanService.loanApplicationStatisticsItem().then((res: any) => {
      if (res) {
        this.dialog.open(LoanStatisticsItemComponent, {
          data: {
            item: res
          }
        })
      }
    })
  }

  cancelDialog(id: number) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите отменить?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.cancel(id)
    })
  }

  cancel(id: number) {
    this.loanService.cancelLoan(id).then((res: any) => {
      if (res) {
        this.hr.showMessage(true, 'успешно отменен', '', [])
      } else {
        this.hr.showMessage(false, res.message, '', [])
      }
      this.getList()
    })
  }

  exportLoanExcel(): void {
    localStorage.setItem('loadingCol', '1')
    this.loanService.loanExcelDownload(this.filter).subscribe((response) => {
      let blob: any = new Blob([response], {type: "application/octet-stream"})
      const a = document.createElement("a");
      a.download = "loan-application.xlsx";
      a.href = URL.createObjectURL(blob);
      a.click();
      localStorage.setItem('loadingCol', '0')
    })
  }

  openDetail(id: number, type: string, state: string) {
    if (type === 'insurance') {
      this.loanService.getPaymentDetail(id).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(DetailLoanAppComponent, {
            maxWidth: '100%',
            width: '600px',
            data: {
              items: res,
              detail: type,
              id,
              state
            }
          });
          dialogRef.componentInstance.onDetail.subscribe(() => {
            dialogRef.close()
          })
        }
      })
    } else {
      const find = this.dataList.find((el) => el.id === id)
      if (find) {
        let dialogRef = this.dialog.open(DetailLoanAppComponent, {
          maxWidth: '100%',
          width: '600px',
          data: {
            items: find,
            detail: type,
            id,
            state
          }
        });
        dialogRef.componentInstance.onDetail.subscribe(() => {
          dialogRef.close()
        })

      }

    }
  }

  conveyorRefresh(id: number) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите обновить конвейор ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.loanService.applicationConveyorRefresh(id).then((res: any) => {
        if (res) {
          this.hr.showMessage(true, res.message ? res.message : 'Успешно!')
        } else {
          this.hr.showMessage(true, res.message)
        }
        this.getList()
      })
    })
  }

  filterDate(type: string) {
    if (type === 'date') {
      let date1 = new Date(this.filter.fromTime)
      let date = new Date(this.filter.toTime)
      let year = date.getFullYear()
      let year1 = date1.getFullYear()
      let month = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      let month1 = (date1.getMonth() + 1) > 9 ? date1.getMonth() + 1 : `0${date1.getMonth() + 1}`
      let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      let day1 = date1.getDate() > 9 ? date1.getDate() : `0${date1.getDate()}`
      let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
      let hours1 = date1.getHours() > 9 ? date1.getHours() : `0${date1.getHours()}`
      let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
      let minutes1 = date1.getMinutes() > 9 ? date1.getMinutes() : `0${date1.getMinutes()}`
      let seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`
      let seconds1 = date1.getSeconds() > 9 ? date1.getSeconds() : `0${date1.getSeconds()}`
      const fromTime = `${year1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}`
      const toTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      if (this.filter.fromTime.length && this.filter.toTime) {
        this.filter.fromTime = fromTime
        this.filter.toTime = toTime
        this.getList()
      }
    }
    this.reqData.page = 0
    this.currentPage = 1
    if (this.filter.firstName.length > 2 || this.filter.passport.length > 2 || this.filter.phone.length > 2 || this.filter.lastName.length > 2 || this.filter.pinfl.length > 2 || this.filter.clientCode.length > 2) {
      this.getList()
    }
  }


  filter_() {
    this.filter.loanApplicationStatus === 'Все' ? this.filter.loanApplicationStatus = null : this.filter.loanApplicationStatus
    this.filter.applicationState === 'Все' ? this.filter.applicationState = null : this.filter.applicationState
    this.filter.loanApplicationStep === 'Все' ? this.filter.loanApplicationStep = null : this.filter.loanApplicationStep
    this.filter.absApplicationState === 'Все' ? this.filter.absApplicationState = null : this.filter.absApplicationState
    this.reqData.page = 0
    this.currentPage = 1
    this.getList()
  }

  openDialog(id: number) {
    this.loanService.getOneLoanApp(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(LoanAppGetDialogComponent, {
          width: '750px',
          maxWidth: '100%',
          height: '750px',
          maxHeight: '750px',
          data: {
            items: res.items,
            loanId: id
          }
        });
        dialogRef.componentInstance.onRefresh.subscribe(()=>{
          dialogRef.close()
          this.getList()
        })
      }
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    // @ts-ignore
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    // @ts-ignore
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  getList() {
    this.loanService.getLoanAppList(this.reqData, this.filter).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
