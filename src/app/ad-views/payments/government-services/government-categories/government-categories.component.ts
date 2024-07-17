import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Router} from "@angular/router";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {MatDialog} from "@angular/material/dialog";
import {
  GovermentCategoryCreateComponent
} from "../../../../ad-components/ad-payment/government-category/goverment-category-create/goverment-category-create.component";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  GovermentCategoryEditComponent
} from "../../../../ad-components/ad-payment/government-category/goverment-category-edit/goverment-category-edit.component";
import {
  GovernmentAttachPhotoComponent
} from "../../../../ad-components/ad-payment/government-category/government-attach-photo/government-attach-photo.component";
import {
  GovernmentTitleDialogComponent
} from "../../../../ad-components/ad-payment/government-category/government-title-dialog/government-title-dialog.component";

@Component({
  selector: 'app-government-categories',
  templateUrl: './government-categories.component.html',
  styles: []
})
export class GovernmentCategoriesComponent implements OnInit {
  public dataList: Array<any> = []
  public dataListDefault: Array<any> = []
  public isDrop: boolean = false
  public loading: boolean = false

  constructor(
    private govService: GovernmentService,
    private router: Router,
    private dialog: MatDialog,
    private hrService: HrService
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true
    this.govService.stateCategoryList({
      parent: null
    }).then((res: any) => {
      if (res) {
        this.dataList = res.categories
        this.dataListDefault = res.categories
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  sortData() {
    this.govService.stateCategorySort(this.dataList).then((res) => {
      if (res) {
        this.hrService.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getData()
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
  }

  navigateTo(type: string, uuid: string) {
    if (type === 'CATEGORY') {
      this.router.navigate(['government-settings/categories/child'], {queryParams: {id: uuid}}).then(() => {
      })
    } else if (type === 'SERVICE') {
      this.router.navigate(['government-settings/service'], {queryParams: {id: uuid}}).then(() => {
      })
    }
  }

  openEditDialog(uuid: string, type: string) {
    if (type === 'CATEGORY') {
      this.govService.stateCategoryOne(uuid).then((res: any) => {
        if (res) {
          console.log(res)
          let dialogRef = this.dialog.open(GovermentCategoryEditComponent, {
            width: '500px',
            maxWidth: '500px',
            data: {
              title: res.title,
              categoryId: res.uuid
            }
          })
          dialogRef.componentInstance.onCreateCategory.subscribe(() => {
            dialogRef.close()
            this.getData()
          })
        }
      })
    }
  }

  openAttachPhotoDialog(id: string, type: string, logo: any) {
    let dialogRef = this.dialog.open(GovernmentAttachPhotoComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        uuid: id,
        paymentType: type,
        logo: logo
      }
    })
    dialogRef.componentInstance.onAttachPhoto.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(GovermentCategoryCreateComponent, {
      width: '500px',
      maxWidth: '500px'
    })
    dialogRef.componentInstance.onCreateCategory.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openCategoryTitleDialog(id: string, type: string) {
    if (type === 'SERVICE') {
      this.govService.stateServiceOne(id).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(GovernmentTitleDialogComponent, {
            width: '900px',
            maxWidth: '900px',
            data: {
              translates: res.translates,
              id: res.uuid,
              type
            }
          })
          dialogRef.componentInstance.onTranslateTitle.subscribe((event) => {
            dialogRef.close()
            this.getData()
          })
        }
      })
    } else if (type === 'CATEGORY') {
      this.govService.stateCategoryOne(id).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(GovernmentTitleDialogComponent, {
            width: '900px',
            maxWidth: '900px',
            data: {
              translates: res.translates,
              id: res.uuid,
              type
            }
          })
          dialogRef.componentInstance.onTranslateTitle.subscribe((event) => {
            dialogRef.close()
            this.getData()
          })
        }
      })
    }
  }

  changeShow(uuid: string, visible: string, type: string) {
    let status = visible === 'VISIBLE' ? 'INVISIBLE' : 'VISIBLE'
    if (type === 'CATEGORY') {
      const dialogRef = this.dialog.open(AdAgreeDialogComponent, {
        maxWidth: '100%',
        width: '400px',
        data: {title: 'Вы точно хотите изменить статус ?'}
      })
      dialogRef.componentInstance.onAgree.subscribe(() => {
        dialogRef.close()
        this.changeCategoryVisibility(uuid, status)
      })
    }
  }

  changeCategoryVisibility(uuid: string, status: string) {
    this.govService.stateCategoryVisibility(uuid, status).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Статус успешно изменен!')
        this.getData()
      }
    })
  }
}
