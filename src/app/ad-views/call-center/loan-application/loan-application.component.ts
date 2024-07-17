import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoanService} from "../../../ad-services/loan.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {DetailLoanAppComponent} from "../../../ad-components/ad-dialog/detail-loan-app/detail-loan-app.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.scss']
})
export class LoanApplicationComponent implements OnInit {
  showFilter: boolean = false
  loadingList: boolean = false;
  dataList: Array<any> = [];
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems: number = 0;
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  filterForm: FormGroup = this.fb.group({
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
  })

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
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

  getList() {
    this.loadingList = true
    this.loanService.getLoanAppProcessList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.items
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      }
    })
  }

  getOrder(index: number) {
    return (this.currentPage - 1) * 10 + (index + 1)
  }

  clearAll() {
    this.currentPage = 1;
    this.reqData = {
      filter: {},
      paging: {
        page: 0,
        size: 10
      }
    }
    this.filterForm.patchValue({
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
    })
    this.getList()
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

  filterDate() {
    if (this.filterForm.value.loanApplicationStep && this.filterForm.value.loanApplicationStep !== 'Все') {
      this.reqData.filter['loanApplicationStep'] = this.filterForm.value.loanApplicationStep
    } else {
      delete this.reqData.filter['loanApplicationStep']
    }

    if (this.filterForm.value.absApplicationState && this.filterForm.value.absApplicationState !== 'Все') {
      this.reqData.filter['absApplicationState'] = this.filterForm.value.absApplicationState
    } else {
      delete this.reqData.filter['absApplicationState']
    }

    if (this.filterForm.value.loanApplicationStatus && this.filterForm.value.loanApplicationStatus !== 'Все') {
      this.reqData.filter['loanApplicationStatus'] = this.filterForm.value.loanApplicationStatus
    } else {
      delete this.reqData.filter['loanApplicationStatus']
    }

    if (this.filterForm.value.firstName) {
      this.reqData.filter['firstName'] = this.filterForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.filterForm.value.lastName) {
      this.reqData.filter['lastName'] = this.filterForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.filterForm.value.phone) {
      this.reqData.filter['phone'] = this.filterForm.value.phone
    } else {
      delete this.reqData.filter['phone']
    }

    if (this.filterForm.value.passport) {
      this.reqData.filter['passport'] = this.filterForm.value.passport
    } else {
      delete this.reqData.filter['passport']
    }

    if (this.filterForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.filterForm.value.pinfl
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.filterForm.value.clientCode) {
      this.reqData.filter['clientCode'] = this.filterForm.value.clientCode
    } else {
      delete this.reqData.filter['clientCode']
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getList()
  }

  pageClicked(val: number) {
    this.reqData.paging.page = val - 1
    this.currentPage = val
    this.getList()
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
