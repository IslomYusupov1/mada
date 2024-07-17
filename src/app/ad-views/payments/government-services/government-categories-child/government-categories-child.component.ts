import {Component, OnInit} from '@angular/core';
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  GovermentCategoryEditComponent
} from "../../../../ad-components/ad-payment/government-category/goverment-category-edit/goverment-category-edit.component";
import {
  GovernmentAttachPhotoComponent
} from "../../../../ad-components/ad-payment/government-category/government-attach-photo/government-attach-photo.component";
import {
  GovermentCategoryCreateComponent
} from "../../../../ad-components/ad-payment/government-category/goverment-category-create/goverment-category-create.component";
import {
  GovernmentTitleDialogComponent
} from "../../../../ad-components/ad-payment/government-category/government-title-dialog/government-title-dialog.component";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  GovernmentServiceCreateComponent
} from "../../../../ad-components/ad-payment/government-service/government-service-create/government-service-create.component";
import {
  GovernmentServiceEditComponent
} from "../../../../ad-components/ad-payment/government-service/government-service-edit/government-service-edit.component";

@Component({
  selector: 'app-government-categories-child',
  templateUrl: './government-categories-child.component.html',
  styles: [`
    .card-face {
      position: absolute;
      right: 0;
      top: 42px;
      background-color: rgba(255, 241, 171, 0.7);
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      font-size: 12px;
    }
  `]
})
export class GovernmentCategoriesChildComponent implements OnInit {
  public loading: boolean = false
  public dataList: Array<any> = []
  public dataListDefault: Array<any> = []
  public serviceTypeList: Array<any> = []
  public isDrop: boolean = false
  public categoryName: string = ''
  public categoryId!: string

  constructor(
    private govService: GovernmentService,
    private hrService: HrService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((q) => {
      this.categoryId = q.id
      if (this.categoryId) {
        this.getData()
        this.getServiceTypeList()
      }
    })
  }

  getData() {
    this.govService.stateCategoryList({parent: this.categoryId}).then((res: any) => {
      this.dataList = res.categories
      this.dataListDefault = res.categories
    })
  }

  getServiceTypeList() {
    this.govService.stateServiceTypeList().then((res: any) => {
      if (res) {
        this.serviceTypeList = res.serviceTypes
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
        // window.location.reload()
      })
    } else if (type === 'SERVICE') {
      this.router.navigate(['government-settings/service'], {queryParams: {id: uuid}}).then(() => {
      })
    }
  }

  openEditDialog(uuid: string, type: string) {
    if (type === 'CATEGORY') {
      this.categoryEditDialog(uuid)
    } else if (type === 'SERVICE') {
      this.serviceEditDialog(uuid)
    }
  }

  categoryEditDialog(uuid: string) {
    this.govService.stateCategoryOne(uuid).then((res: any) => {
      if (res) {
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

  serviceEditDialog(uuid: string) {
    this.govService.stateServiceOne(uuid).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(GovernmentServiceEditComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            serviceId: res.uuid,
            serviceDefaultName: res.fullTitle,
            categoryDefaultName: res.title,
            type: res.stateServiceType,
            requestName: res.requestName,
            technicalWorks: res.technicalWorks,
            show: res.show,
            myId: res.myId,
            serviceTypeList: this.serviceTypeList
          }
        })
        dialogRef.componentInstance.onEditService.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
      }
    })
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

  openCreateServiceDialog() {
    const dialogRef = this.dialog.open(GovernmentServiceCreateComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        serviceTypes: this.serviceTypeList,
        parent: this.categoryId
      }
    })
    dialogRef.componentInstance.onCreateService.subscribe(() => {
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
              fullTitleTranslates: res.fullTranslate,
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
      this.categoryVisible(uuid, status)
    } else if (type === 'SERVICE') {
      this.serviceVisible(uuid, status)
    }
  }

  categoryVisible(uuid: string, status: string) {
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

  serviceVisible(uuid: string, status: string) {
    const dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите изменить статус ?'}
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.changeServiceVisibility(uuid, status)
    })
  }

  changeCategoryVisibility(uuid: string, status: string) {
    this.govService.stateCategoryVisibility(uuid, status).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Статус успешно изменен!')
        this.getData()
      }
    })
  }

  changeServiceVisibility(uuid: string, status: string) {
    this.govService.stateServiceVisibility(uuid, status).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Статус успешно изменен!')
        this.getData()
      }
    })
  }
}
