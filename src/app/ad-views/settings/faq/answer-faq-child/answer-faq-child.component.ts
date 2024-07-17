import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {
  PaynetServiceEditComponent
} from "../../../payments/paynet-services/paynet-service-edit/paynet-service-edit.component";
import {
  PaynetCategoryEditComponent
} from "../../../payments/paynet-categories/paynet-category-edit/paynet-category-edit.component";
import {
  AttachPhotoDialogComponent
} from "../../../../ad-components/ad-payment/paynet-category/attach-photo-dialog/attach-photo-dialog.component";
import {
  CategoryTitleDialogComponent
} from "../../../../ad-components/ad-payment/paynet-category/category-title-dialog/category-title-dialog.component";
import {
  PaynetCategoryCreateComponent
} from "../../../payments/paynet-categories/paynet-category-create/paynet-category-create.component";
import {
  PaynetServiceCreateComponent
} from "../../../../ad-components/ad-payment/paynet-service/paynet-service-create/paynet-service-create.component";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {FaqService} from "../../../../ad-services/faq.service";
import {EditFaqComponent} from "../../../../ad-components/ad-dialog/edit-faq/edit-faq.component";
import {
  TranslateFaqDialogComponent
} from "../../../../ad-components/ad-dialog/translate-faq-dialog/translate-faq-dialog.component";
import {CreateFaqComponent} from "../../../../ad-components/ad-dialog/create-faq/create-faq.component";

@Component({
  selector: 'app-answer-faq-child',
  templateUrl: './answer-faq-child.component.html',
  styles: [
  ]
})
export class AnswerFaqChildComponent implements OnInit ,OnDestroy{
  panelOpenState:boolean = false
  catId!: number
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
    private _faqService: FaqService,
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
    })
    this.subscription.add(sub)
  }

  getData() {
    this._faqService.getOneFaq(this.catId).then((res: any) => {
      this.dataList = res.questions
      this.dataListDefault = res.questions
      this.categoryName = res.title
    })
  }
  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
  }

  openEditDialog(id: number) {
    this._faqService.getOneFaq(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(EditFaqComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            title: res.title,
            id: res.id,
            visible: res.visible,
          }
        })
        const sub = dialogRef.componentInstance.onEditFaq.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })

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



  categoryTitleDialog(id: number) {
    this._faqService.getOneFaq(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(TranslateFaqDialogComponent, {
          width: '900px',
          maxWidth: '900px',
          data: {
            translates: res.translates? res.translates : '',
            id: res.id,
            type:"FAQ"
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

  sortData() {
    this._faqService.orderFaq(this.dataList).then((res) => {
      if (res) {
        this.showMessage(true, 'успешно!')
        this.isDrop = false
        this.getData()
      }
    })
  }

  navigateTo(id: number) {this.router.navigate(['settings/faq/answer-question'], {queryParams: {id: id}}).then(() => {})}
  openCreateCategoryDialog() {
    let dialogRef = this.dialog.open(CreateFaqComponent, {
      width: '500px',
      maxWidth: '500px'
    })
    const sub = dialogRef.componentInstance.onCreateFaq.subscribe(() => {
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
