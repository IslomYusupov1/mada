import {Component, OnInit} from '@angular/core';
import {DepositService} from "../../../ad-services/deposit.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DocumentUpdateAppDialogComponent} from "./document-update-app-dialog/document-update-app-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  DocumentUpdateAppCompareDialogComponent
} from "./document-update-app-compare-dialog/document-update-app-compare-dialog.component";

@Component({
  selector: 'app-document-update-application',
  templateUrl: './document-update-application.component.html',
  styleUrls: ['./document-update-application.component.scss']
})
export class DocumentUpdateApplicationComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  statusList: Array<string> = []
  typeList: Array<string> = []
  totalPages: number = 1;
  currentPage: number = 1;
  totalItems!: number;
  reqData: any = {
    filter: {},
    paging: {
      page: 0,
      size: 10
    }
  }

  searchForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    pinfl: '',
    phone: '',
    applicationStatus: '',
  })

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private hrService: HrService,
    private depositService: DepositService
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.depositService.documentUpdateApplication(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.dataList.forEach((item, i) => {
          item.position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1)
        })
        this.totalItems = res.paging.totalItems
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    })
  }

  openDetailsDialog(id: number) {
    this.depositService.documentUpdateApplicationGetOne(id).then((res: any) => {
      if (res) {
        this.dialog.open(DocumentUpdateAppDialogComponent, {
          width: '1100px',
          maxWidth: '1100px',
          maxHeight: '700px',
          data: {
            info: res
          }
        })
      }
    })
  }

  compareAbs(id: number): void {
    this.depositService.documentCompareAbs({id}).then((res: any) => {
      if (res) {
        this.dialog.open(DocumentUpdateAppCompareDialogComponent, {
          width: '80%',
          maxHeight: '700px',
          data: {
            item: res
          }
        })
      }
    })
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите удалить?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(()=>{
      dialogRef.close()
      this.delete(id)
    })
  }

  delete(id: number) {
    this.depositService.documentUpdateDelete({id}).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно удален!')
        this.getData()
      }
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
      this.readUpdateApplication(id)
    })
  }
  readUpdateApplication(id: number) {
    this.depositService.documentUpdateApplicationRead(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message)
       this.getData()
      }
    })
  }
  retry(id: number): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы уверены, что хотите повторно отправить запрос?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.depositService.documentUpdateApplicationRetry(id).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : '')
          this.getData()
        }
      })
    })
  }

  search(): void {
    if (this.getReqFilterValue() && this.getFormValue()) {
      return
    }

    if (this.searchForm.value.firstName) {
      this.reqData.filter['firstName'] = this.searchForm.value.firstName
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.searchForm.value.lastName) {
      this.reqData.filter['lastName'] = this.searchForm.value.lastName
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.searchForm.value.phone) {
      this.reqData.filter['phone'] = this.searchForm.value.phone
    } else {
      delete this.reqData.filter['phone']
    }

    if (this.searchForm.value.pinfl) {
      this.reqData.filter['pinfl'] = this.searchForm.value.pinfl
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.searchForm.value.applicationStatus) {
      this.reqData.filter['applicationStatus'] = this.searchForm.value.applicationStatus
    } else {
      delete this.reqData.filter['applicationStatus']
    }

    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  getReqFilterValue(): boolean {
    return !this.reqData.filter['firstName'] && !this.reqData.filter['lastName'] && !this.reqData.filter['phone']
      && !this.reqData.filter['pinfl'] && !this.reqData.filter['applicationStatus']
  }

  getFormValue(): boolean {
    return !this.searchForm.value.firstName && !this.searchForm.value.lastName && !this.searchForm.value.phone
      && !this.searchForm.value.pinfl &&  !this.searchForm.value.applicationStatus
  }

  clearFilter(): void {
    if (this.getReqFilterValue() && this.getFormValue()) {
      return
    }

    this.searchForm.patchValue({
      phone: '',
      pinfl: '',
      firstName: '',
      lastName: '',
      applicationStatus: '',
    })
    this.currentPage = 1
    this.reqData.paging['page'] = 0
    this.reqData.filter = {}
    this.getData()
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
}
