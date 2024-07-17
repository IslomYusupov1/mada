import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {Subscription} from "rxjs";
import {
  BannerContentCreateComponent
} from "../../../../ad-components/ad-settings/banner-content/banner-content-create/banner-content-create.component";
import {
  BannerContentEditComponent
} from "../../../../ad-components/ad-settings/banner-content/banner-content-edit/banner-content-edit.component";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

@Component({
  selector: 'app-banner-content',
  templateUrl: './banner-content.component.html',
  styleUrls: ['./banner-content.component.scss']
})
export class BannerContentComponent implements OnInit, OnDestroy {
  bannerId: string = ''
  dataList: Array<any> = []
  loading: boolean = false
  private subscription = new Subscription()

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private bannerService: BannerService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => {
      if (q.ban_id) {
        this.bannerId = q.ban_id
        this.getData()
      }
    })
  }

  getData() {
    this.loading = true
    this.bannerService.bannerContentListByBanner(this.bannerId).then((res: any) => {
      if (res) {
        this.dataList = res
        this.loading = false
      }
    })
  }

  openCreateBannerContentDialog() {
    let dialogRef = this.dialog.open(BannerContentCreateComponent, {
      width: '800px',
      maxWidth: '800px',
      data: {
        bannerId: this.bannerId
      }
    })
    const sub = dialogRef.componentInstance.onCreate.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  openEditBannerDialog(id: string) {
    this.bannerService.bannerContentGetOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(BannerContentEditComponent, {
          width: '900px',
          maxWidth: '900px',
          data: {
            bannerInfo: res
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
        title: 'Вы уверены, что хотите удалить этот баннер контента?'
      }
    })
    const sub = dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteContent(id)
    })
    this.subscription.add(sub)
  }

  deleteContent(id: string) {
    this.bannerService.bannerContentDelete(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Контент баннера успешно удален!')
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

  back() {
    this.location.back()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
