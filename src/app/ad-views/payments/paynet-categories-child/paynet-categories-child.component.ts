import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaynetService} from "../../../ad-services/paynet.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  CategoryTitleDialogComponent
} from "../../../ad-components/ad-payment/paynet-category/category-title-dialog/category-title-dialog.component";
import {
  PaynetCategoryCreateComponent
} from "../paynet-categories/paynet-category-create/paynet-category-create.component";
import {
  AttachPhotoDialogComponent
} from "../../../ad-components/ad-payment/paynet-category/attach-photo-dialog/attach-photo-dialog.component";
import {
  PaynetServiceCreateComponent
} from "../../../ad-components/ad-payment/paynet-service/paynet-service-create/paynet-service-create.component";
import {Subscription} from "rxjs";
import {PaynetServiceEditComponent} from "../paynet-services/paynet-service-edit/paynet-service-edit.component";
import {PaynetCategoryEditComponent} from "../paynet-categories/paynet-category-edit/paynet-category-edit.component";

@Component({
  selector: 'app-paynet-categories-child',
  templateUrl: './paynet-categories-child.component.html',
  styleUrls: ['./paynet-categories-child.component.scss']
})
export class PaynetCategoriesChildComponent implements OnInit, OnDestroy {
  catId: string = ''
  visible: string = ''
  categoryName: string = ''
  dataList: Array<any> = []
  dataListDefault: Array<any> = []
  isDrop: boolean = false
  serviceTypes: Array<any> = []
  merchantList: Array<any> = []
  checkTemplateList: Array<any> = []

  private subscription = new Subscription()

  constructor(
    private paynetService: PaynetService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    const sub = this.route.queryParams.subscribe(q => {
      this.catId = q.id
      this.getData()
      this.getOneCategory()
      this.getCheckTemplateList()
      this.getMerchantList()
      this.getServiceTypeList()
    })
    this.subscription.add(sub)
  }

  getData() {
    this.paynetService.categoryList(this.catId).then((res: any) => {
      this.dataList = res.categories
      this.dataListDefault = res.categories
    })
  }

  getOneCategory() {
    this.paynetService.categoryGetOne(this.catId).then((res: any) => {
      if (res) {
        this.categoryName = res.title
      }
    })
  }

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
  }

  getServiceTypeList() {
    this.paynetService.getServiceTypeList().then((res: any) => {
      if (res) {
        this.serviceTypes = res.serviceTypes
      }
    })
  }

  getMerchantList() {
    this.paynetService.getPaymentMerchantList().then((res: any) => {
      if (res) {
        this.merchantList = res.serviceTypes
      }
    })
  }

  getCheckTemplateList() {
    this.paynetService.getPaymentCheckTemplateList().then((res: any) => {
      if (res) {
        this.checkTemplateList = res.checkTemplates
        this.checkTemplateList.unshift('NO_TEMPLATE')
      }
    })
  }

  openEditDialog(uuid: string, type: string) {
    if (type === 'SERVICE') {
      this.paynetService.serviceGetOne(uuid).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(PaynetServiceEditComponent, {
            width: '500px',
            maxWidth: '500px',
            height: '700px',
            data: {
              resData: res,
              serviceTypes: this.serviceTypes,
              merchantList: this.merchantList,
              checkTemplateList: this.checkTemplateList
            }
          })
          const sub = dialogRef.componentInstance.onEditService.subscribe(() => {
            dialogRef.close()
            this.getData()
          })
          this.subscription.add(sub)
        }
      })
    } else if (type === 'CATEGORY') {
      this.paynetService.categoryGetOne(uuid).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(PaynetCategoryEditComponent, {
            width: '500px',
            maxWidth: '500px',
            data: {
              title: res.title,
              uuid: res.uuid,
              forMyHome: res.forMyHome
            }
          })
          const sub = dialogRef.componentInstance.onEditCategory.subscribe(() => {
            dialogRef.close()
            this.getData()
          })
          this.subscription.add(sub)
        }
      })
    }
  }

  openAttachPhotoDialog(id: string, type: string, logo: any) {
    let dialogRef = this.dialog.open(AttachPhotoDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        uuid: id,
        paymentType: type,
        logo: logo
      }
    })
    const sub = dialogRef.componentInstance.onAttachPhoto.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  changeShow(paymentCategoryId: string, visible: string, type: string) {
    if (visible === 'VISIBLE') {
      this.visible = "INVISIBLE"
    } else {
      this.visible = 'VISIBLE'
    }
    if (this.visible && type === 'CATEGORY') {
      this.paynetService.categoryChangeIsShow(paymentCategoryId, this.visible).then((res) => {
        if (res) {
          this.showMessage(true, 'Статус успешно изменен!')
          this.getData()
        }
      })
    } else if (this.visible && type === 'SERVICE') {
      this.paynetService.serviceVisibility(paymentCategoryId, this.visible).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Статус успешно изменен!')
          this.getData()
        }
      })
    }
  }

  categoryTitleDialog(id: string, type: string) {
    if (type === 'SERVICE') {
      this.paynetService.serviceGetOne(id).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(CategoryTitleDialogComponent, {
            width: '900px',
            maxWidth: '900px',
            data: {
              translates: res.translates,
              id: res.uuid,
              type: type
            }
          })
          const sub = dialogRef.componentInstance.onTranslateTitle.subscribe((event) => {
            dialogRef.close()
            this.getData()
          })
          this.subscription.add(sub)
        }
      })
    } else if (type === 'CATEGORY') {
      this.paynetService.categoryGetOne(id).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(CategoryTitleDialogComponent, {
            width: '900px',
            maxWidth: '900px',
            data: {
              translates: res.translates,
              id: res.uuid,
              type: type
            }
          })
          const sub = dialogRef.componentInstance.onTranslateTitle.subscribe((event) => {
            dialogRef.close()
            this.getData()
          })
          this.subscription.add(sub)
        }
      })
    }
  }

  sortData() {
    this.paynetService.categorySort(this.dataList).then((res) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getData()
      }
    })
  }

  navigateTo(type: string, uuid: string) {
    if (type === 'CATEGORY') {
      this.router.navigate(['paynet/categories/child'], {queryParams: {id: uuid}}).then(() => {
      })
    } else if (type === 'SERVICE') {
      this.router.navigate(['/paynet/services'], {queryParams: {id: uuid}}).then(() => {
      })
    }
  }

  openCreateCategoryDialog() {
    let dialogRef = this.dialog.open(PaynetCategoryCreateComponent, {
      width: '500px',
      height: '500px'
    })
    const sub = dialogRef.componentInstance.onCreateCategory.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  openCreateServiceDialog() {
    let dialogReg = this.dialog.open(PaynetServiceCreateComponent, {
      width: '500px',
      maxWidth: '500px',
      height: '700px',
      data: {
        serviceTypeList: this.serviceTypes,
        merchantList: this.merchantList,
        checkTemplateList: this.checkTemplateList
      }
    })
    const sub = dialogReg.componentInstance.onCreatePaynetService.subscribe(() => {
      dialogReg.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
