import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MatDialog} from "@angular/material/dialog";
import {
  BannerCreateDialogComponent
} from "../../../../ad-components/ad-settings/banner-list/banner-create-dialog/banner-create-dialog.component";
import {Subscription} from "rxjs";
import {
  BannerEditDialogComponent
} from "../../../../ad-components/ad-settings/banner-list/banner-edit-dialog/banner-edit-dialog.component";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-banners-list',
  templateUrl: './banners-list.component.html',
  styleUrls: ['./banners-list.component.scss']
})
export class BannersListComponent implements OnInit, OnDestroy {
  collectionId: string = ''
  dataList: Array<any> = []
  loading: boolean = false
  private subscription = new Subscription()

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private hrService: HrService,
    private bannerService: BannerService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => {
      if (q.col_id) {
        this.collectionId = q.col_id
        this.getData()
      }
    })
  }

  getData() {
    this.loading = true
    this.bannerService.bannerListByCollection(this.collectionId).then((res: any) => {
      if (res) {
        this.dataList = res
        this.loading = false
      }
    })
  }


  openCreateBannerDialog() {
    this.bannerService.bannerTypeList().then((res) => {
      if (res) {
        let dialogRef = this.dialog.open(BannerCreateDialogComponent, {
          width: '850px',
          maxWidth: '850px',
          data: {
            collectionId: this.collectionId,
            types: res
          }
        })
        const sub = dialogRef.componentInstance.onCreate.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })
  }

  openEditBannerDialog(id: string) {
 this.bannerService.bannerTypeList().then((res1)=>{
   this.bannerService.bannerGetOne(id).then((res: any) => {
     if (res) {
       let dialogRef = this.dialog.open(BannerEditDialogComponent, {
         width: '850px',
         maxWidth: '850px',
         data: {
           info: res,
           types:res1
         }
       })
       const sub = dialogRef.componentInstance.onEdit.subscribe(() => {
         dialogRef.close()
         this.getData()
       })
       this.subscription.add(sub)
     }
   })
 })
  }

  openBannerBlock(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите заблокировать этот баннер?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.blockBanner(id)
    })
  }

  blockBanner(id: string) {
    this.bannerService.bannerBlock(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message)
        this.getData()
      }
    })
  }

  openBannerUnblock(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите разблокировать этот баннер?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.unblockBanner(id)
    })
  }

  unblockBanner(id: string) {
    this.bannerService.bannerUnblock(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message)
        this.getData()
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
    this.bannerService.bannerDelete(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Баннер успешно удалена!')
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
