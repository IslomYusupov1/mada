import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {PaynetService} from "../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {
  animate,
  style,
  transition,
  trigger,
  state
} from "@angular/animations";
import {
  CategoryTitleDialogComponent
} from "../../../ad-components/ad-payment/paynet-category/category-title-dialog/category-title-dialog.component";
import {PaynetCategoryCreateComponent} from "./paynet-category-create/paynet-category-create.component";
import {
  AttachPhotoDialogComponent
} from "../../../ad-components/ad-payment/paynet-category/attach-photo-dialog/attach-photo-dialog.component";
import {PaynetCategoryEditComponent} from "./paynet-category-edit/paynet-category-edit.component";
import {Subscription} from "rxjs";
import {PaynetServiceEditComponent} from "../paynet-services/paynet-service-edit/paynet-service-edit.component";
import {
  PaynetServiceCreateComponent
} from "../../../ad-components/ad-payment/paynet-service/paynet-service-create/paynet-service-create.component";

@Component({
  selector: 'app-paynet-categories',
  templateUrl: './paynet-categories.component.html',
  styles: [],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       overflow: 'hidden',
  //       height: '*',
  //       width: '300px'
  //     })),
  //     state('out', style({
  //       opacity: '0',
  //       overflow: 'hidden',
  //       height: '0px',
  //       width: '0px'
  //     })),
  //     transition('in => out', animate('400ms ease-in-out')),
  //     transition('out => in', animate('400ms ease-in-out'))
  //   ])
  // ]
})
export class PaynetCategoriesComponent implements OnInit, OnDestroy {
  helpMenuOpen: string = ''
  visible: string = ''
  dataList: Array<any> = []
  dataListDefault: Array<any> = []
  isDrop: boolean = false
  serviceTypes: Array<any> = []
  merchantList: Array<any> = []
  checkTemplateList: Array<any> = []

  private subscription = new Subscription()

  constructor(
    private paynet: PaynetService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.helpMenuOpen = 'out';
    this.getCheckTemplateList()
    this.getMerchantList()
    this.getServiceTypeList()
    this.getData()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }


  getData() {
    this.paynet.categoryList(null).then(res => {
      this.dataList = res.categories
      this.dataListDefault = res.categories
    })
  }

  categoryTitleDialog(id: string, type: string) {
    this.paynet.categoryGetOne(id).then((res: any) => {
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

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
  }

  changeShow(paymentCategoryId: string, visible: string, type: string) {
    if (visible === 'VISIBLE') {
      this.visible = "INVISIBLE"
    } else {
      this.visible = 'VISIBLE'
    }
    if (this.visible && type === 'CATEGORY') {
      this.paynet.categoryChangeIsShow(paymentCategoryId, this.visible).then((res) => {
        if (res) {
          this.showMessage(true, 'Статус успешно изменен!')
          this.getData()
        }
      })
    } else if (this.visible && type === 'SERVICE') {
      this.paynet.serviceVisibility(paymentCategoryId, this.visible).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Статус успешно изменен!')
          this.getData()
        }
      })
    }
  }

  sortData() {
    this.paynet.categorySort(this.dataList).then((res) => {
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
      this.router.navigate(['paynet/services'], {queryParams: {id: uuid}}).then(() => {
      })
    }
  }

  getServiceTypeList() {
    this.paynet.getServiceTypeList().then((res: any) => {
      if (res) {
        this.serviceTypes = res.serviceTypes
      }
    })
  }

  getMerchantList() {
    this.paynet.getPaymentMerchantList().then((res: any) => {
      if (res) {
        this.merchantList = res.serviceTypes
      }
    })
  }

  getCheckTemplateList() {
    this.paynet.getPaymentCheckTemplateList().then((res: any) => {
      if (res) {
        this.checkTemplateList = res.checkTemplates
        this.checkTemplateList.unshift('NO_TEMPLATE')
      }
    })
  }

  openCreateCategoryDialog() {
    let dialogRef = this.dialog.open(PaynetCategoryCreateComponent, {
      width: '500px',
      maxWidth: '500px'
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

  openEditDialog(uuid: string, type: string) {
    if (type === 'CATEGORY') {
      this.paynet.categoryGetOne(uuid).then((res: any) => {
        if (res) {
          let dialogRef = this.dialog.open(PaynetCategoryEditComponent, {
            width: '500px',
            maxWidth: '500px',
            data: {
              title: res.title,
              uuid: res.uuid,
              forMyHome: res.forMyHome,
              autoPay: res.autoPay
            }
          })
          const sub = dialogRef.componentInstance.onEditCategory.subscribe(() => {
            dialogRef.close()
            this.getData()
          })
          this.subscription.add(sub)
        }
      })
    } else if (type === 'SERVICE') {
      this.paynet.serviceGetOne(uuid).then((res: any) => {
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

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
