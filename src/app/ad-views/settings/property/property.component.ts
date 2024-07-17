import { Component, OnInit } from '@angular/core';
import {BannerService} from "../../../ad-services/settings/banner.service";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  dataList: Array<any> = [];
  totalPages: number = 1
  currentPage: number = 1
  loadingList: boolean = false
  reqData = {
    page: 0,
    size: 10
  }

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    private hrService: HrService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.bannerService.propertyGet(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages + 1
        this.loadingList = false
      } else {
        this.loadingList = false
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

  openUpdateDialog() {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы уверены, что хотите обновить действия?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.updateData()
    })
  }

  updateData() {
    this.bannerService.propertyUpdate().then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Успешно обновлено!')
        this.getData()
      }
    })
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
