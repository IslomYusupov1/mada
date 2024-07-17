import {Component, OnInit} from '@angular/core';
import {DepositService} from "../../../ad-services/deposit.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {ApplicationReviewDialogComponent} from "./application-review-dialog/application-review-dialog.component";
import {
  ApplicationReviewDescriptionDialogComponent
} from "./application-review-description-dialog/application-review-description-dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-application-review',
  templateUrl: './application-review.component.html',
  styleUrls: ['./application-review.component.scss']
})
export class ApplicationReviewComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  statusList: Array<string> = []
  typeList: Array<string> = []
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems!: number;
  reqData: any = {
    page: 0,
    size: 10
  }
  selectedFilterBtn: string = ''
  from: string = ''
  to: string = ''

  searchForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    phone: '',
    pinfl: '',
    isOwner: null,
    status: '',
    type: ''
  })

  constructor(
    private fb: FormBuilder,
    private depositService: DepositService,
    private hrService: HrService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getStatusList()
    this.getTypeList()
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.depositService.applicationReviewGetList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach((item, ind) => {
          item.position = (this.reqData.page * this.reqData.size) + (ind + 1)
          if (item.errorMessage) {
            item.errorMessage = item.errorMessage.length > 20 ? item.errorMessage.substr(0,20)+'...' : item.errorMessage
          } else {
            item.errorMessage = '-'
          }
        })
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    }).catch((e) => {
      console.log(e)
      this.loadingList = false
    })
  }

  getStatusList(): void {
    this.depositService.applicationReviewGetStatus().then((res: any) => {
      if (res) {
        this.statusList = res
        this.statusList.unshift('Все')
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

  getTypeList(): void {
    this.depositService.applicationReviewGetType().then((res: any) => {
      if (res) {
        this.typeList = res
        this.typeList.unshift('Все')
      }
    })
  }

  search(): void {
    if (!this.getRequestAdd() && !this.getFormValueBool()) {
      return
    }
    if (this.getFormValueBool()) {
      this.reqData.page = 0
      this.currentPage = 1

      if (this.from && this.to) {
        this.reqData['fromTime'] = this.from
        this.reqData['toTime'] = this.to
      }

      if (this.searchForm.value.phone) {
        this.reqData['phone'] = this.searchForm.value.phone
      } else {
        delete this.reqData['phone']
      }

      if (this.searchForm.value.firstName) {
        this.reqData['firstName'] = this.searchForm.value.firstName
      } else {
        delete this.reqData['firstName']
      }

      if (this.searchForm.value.lastName) {
        this.reqData['lastName'] = this.searchForm.value.lastName
      } else {
        delete this.reqData['lastName']
      }

      if (this.searchForm.value.pinfl) {
        this.reqData['pinfl'] = this.searchForm.value.pinfl
      } else {
        delete this.reqData['pinfl']
      }

      if (this.searchForm.value.status && this.searchForm.value.status !== 'Все') {
        this.reqData['status'] = this.searchForm.value.status
      } else {
        delete this.reqData['status']
      }

      if (this.searchForm.value.isOwner !== '') {
        this.reqData['isOwner'] = this.searchForm.value.isOwner === 'yes'
      } else {
        delete this.reqData['isOwner']
      }

      if (this.searchForm.value.type && this.searchForm.value.type !== 'Все') {
        this.reqData['type'] = this.searchForm.value.type
      } else {
        delete this.reqData['type']
      }

      this.getData()
    } else if (this.getRequestAdd() && !this.getFormValueBool()) {
      this.reqData = {
        page: 0,
        size: 10
      }
      this.currentPage = 1
      this.getData()
    }
  }

  clearFilter(): void {
    if (this.getFormValueBool() || this.getRequestAdd()) {
      this.searchForm.patchValue({
        firstName: '',
        lastName: '',
        phone: '',
        pinfl: '',
        isOwner: null,
        status: '',
        type: ''
      })
      this.from = ''
      this.to = ''
      this.selectedFilterBtn = 'allPeriod'
      this.reqData = {
        page: 0,
        size: 10
      }
      this.currentPage = 1
      this.getData()
    }
  }

  getFormValueBool(): boolean {
    return (this.searchForm.value.phone || this.searchForm.value.pinfl || this.searchForm.value.status || this.searchForm.value.firstName || this.searchForm.value.lastName || this.searchForm.value.isOwner || this.searchForm.value.type || this.from || this.to)
  }

  getRequestAdd(): boolean {
    return (this.reqData.phone || this.reqData.pinfl || this.reqData.status || this.reqData.firstName || this.reqData.lastName || this.reqData.isOwner || this.reqData.type || this.reqData.fromTime || this.reqData.toTime)
  }

  openDetailsDialog(id: number) {
    this.depositService.applicationReviewGetOne(id).then((res: any) => {
      if (res) {
        this.dialog.open(ApplicationReviewDialogComponent, {
          width: '550px',
          maxWidth: '550px',
          maxHeight: '700px',
          data: {
            info: res
          }
        })
      }
    })
  }

  openConfirmApplication(id: number) {
    let dialog = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите подтвердить заявку ?'
      }
    })
    dialog.componentInstance.onAgree.subscribe(() => {
      dialog.close()
      this.confirmApplication(id)
    })
  }

  confirmApplication(id: number) {
    let dialogRef = this.dialog.open(ApplicationReviewDescriptionDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        id,
        changeTo: 'confirm'
      }
    })
    dialogRef.componentInstance.onChangeStatus.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openCancelDialog(id: number) {
    let dialog = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите отменить заявку?'
      }
    })
    dialog.componentInstance.onAgree.subscribe(() => {
      dialog.close()
      this.cancelApplication(id)
    })
  }

  cancelApplication(id: number) {
    let dialogRef = this.dialog.open(ApplicationReviewDescriptionDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        id,
        changeTo: 'cancel'
      }
    })
    dialogRef.componentInstance.onChangeStatus.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openReadAppDialog(id: number) {
    let dialog = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите принять это заявление?'
      }
    })
    dialog.componentInstance.onAgree.subscribe(() => {
      dialog.close()
      this.readApplication(id)
    })
  }

  readApplication(id: number) {
    this.depositService.applicationReviewRead(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message)
        this.dataList.forEach(item => {
          if (item.id === id) {
            item.status = 'READ'
            item.isOwner = true
          }
        })
      }
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getData()
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
}
