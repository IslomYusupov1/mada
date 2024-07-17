import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {UserService} from "../../../ad-services/user.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AmlUserOneComponent} from "../../../ad-components/ad-users/aml-user-one/aml-user-one.component";
import {AmlUserConfirmComponent} from "../../../ad-components/ad-users/aml-user-confirm/aml-user-confirm.component";

@Component({
  selector: 'app-user-blacklist-abs',
  templateUrl: './user-blacklist-abs.component.html',
  styleUrls: ['./user-blacklist-abs.component.scss']
})
export class UserBlacklistAbsComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  statusList: Array<string> = []
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
    status: '',
    reviewStatus: '',
  })

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private hrService: HrService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.userService.userCheckAmlFilter(this.reqData).then((res: any) => {
      if (res) {
        console.log(res)
        this.dataList = res.content
        this.dataList.forEach((item, i) => {
          item.position = (this.reqData.paging.page * this.reqData.paging.size) + (i + 1)
        })
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      } else {
        this.dataList = []
        this.totalItems = 0
        this.totalPages = 0
        this.loadingList = false
      }
    })
  }

  search(): void {
    if (!this.checkFormFilter() && !this.checkReqFilter()) {
      return
    }

    if (this.searchForm.value['status']) {
      this.reqData.filter['status'] = this.searchForm.value['status']
    } else {
      delete this.reqData.filter['status']
    }

    if (this.searchForm.value['firstName']) {
      this.reqData.filter['firstName'] = this.searchForm.value['firstName']
    } else {
      delete this.reqData.filter['firstName']
    }

    if (this.searchForm.value['lastName']) {
      this.reqData.filter['lastName'] = this.searchForm.value['lastName']
    } else {
      delete this.reqData.filter['lastName']
    }

    if (this.searchForm.value['pinfl']) {
      this.reqData.filter['pinfl'] = this.searchForm.value['pinfl']
    } else {
      delete this.reqData.filter['pinfl']
    }

    if (this.searchForm.value['reviewStatus']) {
      this.reqData.filter['reviewStatus'] = this.searchForm.value['reviewStatus']
    } else {
      delete this.reqData.filter['reviewStatus']
    }

    this.currentPage = 1
    this.reqData.paging['page'] = 0
    this.getData()
  }

  checkReqFilter(): boolean {
    return this.reqData.filter['status'] || this.reqData.filter['firstName'] || this.reqData.filter['lastName'] || this.reqData.filter['pinfl'] || this.reqData.filter['reviewStatus']
  }

  checkFormFilter(): boolean {
    return this.searchForm.value['status'] || this.searchForm.value['firstName'] || this.searchForm.value['lastName'] || this.searchForm.value['pinfl'] || this.searchForm.value['reviewStatus']
  }

  clearFilter(): void {
    if (!this.checkFormFilter() && !this.checkReqFilter()) {
      return
    }

    this.searchForm.patchValue({
      status: '',
      firstName: '',
      lastName: '',
      pinfl: '',
      reviewStatus: ''
    })
    this.reqData.filter = {}
    this.reqData.paging['page'] = 0
    this.currentPage = 1
    this.getData()
  }

  openDetailsDialog(id: number): void {
    this.userService.userCheckAmlGetOne(id).then((res: any) => {
      if (res) {
        this.dialog.open(AmlUserOneComponent, {
          width: '500px',
          maxWidth: '500px',
          maxHeight: '700px',
          data: {
            info: res
          }
        })
      }
    })
  }

  checkFromAbs(id: number): void {
    this.userService.userCheckAmlFromAbs(id).then((res: any) => {
      const message = res.status ? 'Positive' : 'Negative'
      this.hrService.showMessage(!res.status, message)
    })
  }

  openReadAppDialog(id: number): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите принять заявку?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.userService.userCheckAmlRead(id).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.getData()
        }
      })
    })
  }

  confirm(id: number, fullName: string): void {
    let dialogRef = this.dialog.open(AmlUserConfirmComponent, {
      width: '500px',
      maxWidth: '500px',
      maxHeight: '700px',
      data: {
        id,
        fullName
      }
    })
    dialogRef.componentInstance.onConfirm.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
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
