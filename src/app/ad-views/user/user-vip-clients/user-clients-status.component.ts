import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../ad-services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-user-clients-status',
  templateUrl: './user-clients-status.component.html',
  styleUrls: ['./user-clients-status.component.scss']
})
export class UserClientsStatusComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  totalItems: number = 0
  totalPages: number = 1;
  currentPage: number = 1;
  reqData: any = {
    params: {},
    paging: {
      page: 0,
      size: 20
    }
  }

  searchForm: FormGroup = this.fb.group({
    phone: ''
  })

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private hrService: HrService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.userService.userProfileStatusList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.totalItems = res.paging.totalItems
        this.loadingList = false
      } else {
        this.loadingList = false
      }
    })
  }

  searchByPhone() {
    if (this.searchForm.value.phone !== '') {
      this.reqData.params['phone'] = this.searchForm.value.phone
      this.getData()
    } else if (this.searchForm.value.phone === '' && this.reqData.params['phone']) {
      delete this.reqData.params['phone']
      this.getData()
    }
  }

  showDeleteVipStatus(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы действительно хотите удалить VIP-статус?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteVipStatus(id)
    })
  }

  private deleteVipStatus(id: string) {
    this.userService.deleteVipStatus(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Пользователь удален из VIP-статуса')
        this.getData()
      }
    })
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
