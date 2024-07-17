import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BannerService} from "../../../ad-services/settings/banner.service";
import {
  CreateBannerCollectionDialogComponent
} from "../../../ad-components/ad-settings/banner-collections/create-banner-collection-dialog/create-banner-collection-dialog.component";
import {Subscription} from "rxjs";
import {
  EditBannerCollectionDialogComponent
} from "../../../ad-components/ad-settings/banner-collections/edit-banner-collection-dialog/edit-banner-collection-dialog.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-banner-collections',
  templateUrl: './banner-collections.component.html',
  styleUrls: ['./banner-collections.component.scss']
})
export class BannerCollectionsComponent implements OnInit, OnDestroy {
  dataList: Array<any> = []
  typeList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  private subscription = new Subscription()
  reqData: any = {
    page: 0,
    size: 10
  }

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
    this.getBannerCollectionTypes()
  }

  getData() {
    this.loadingList = true
    this.bannerService.bannerCollectionList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  getBannerCollectionTypes() {
    this.bannerService.bannerCollectionTypes().then((res: any) => {
      if (res) {
        this.typeList = res
      }
    })
  }

  openCreateBannerCollection() {
    let dialogRef = this.dialog.open(CreateBannerCollectionDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        type: this.typeList
      }
    })
    const sub = dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  openEditDialog(id: string) {
    this.bannerService.bannerCollectionGetOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(EditBannerCollectionDialogComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            id: id,
            title: res.title,
            typeList: this.typeList,
            description: res.description
          }
        })
        const sub = dialogRef.componentInstance.onEdit.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })
  }

  showDeleteDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы уверены, что хотите удалить этот баннер коллекции?'
      }
    })
    const sub = dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(id)
    })
    this.subscription.add(sub)
  }

  delete(id: string) {
    this.bannerService.bannerCollectionDelete(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Коллекция баннеров успешно удалена!')
        this.getData()
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  // Pagination
  pageClicked(val: number) {
    if (val != this.currentPage) {
      this.reqData.paging.page = val - 1
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

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
