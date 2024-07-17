import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {FaqService} from "../../../ad-services/faq.service";
import {Subscription} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CreateFaqComponent} from "../../../ad-components/ad-dialog/create-faq/create-faq.component";
import {EditFaqComponent} from "../../../ad-components/ad-dialog/edit-faq/edit-faq.component";
import {TranslateFaqDialogComponent} from "../../../ad-components/ad-dialog/translate-faq-dialog/translate-faq-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styles: [
  ]
})
export class FaqComponent implements OnInit, OnDestroy {

  helpMenuOpen: string = ''
  visible: string = ''
  dataList: Array<any> = []
  dataListDefault: Array<any> = []
  isDrop: boolean = false
  serviceTypes: Array<any> = []
  merchantList: Array<any> = []
constructor(
  public dialog:MatDialog,
  private _faqService:FaqService,
  public router:Router
) {
}
  private subscription = new Subscription()

  ngOnInit(): void {
    this.helpMenuOpen = 'out';
    this.getData()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }


  getData() {
    this._faqService.getFaqList().then(res => {
      this.dataList = res.faqList
      this.dataListDefault = res.faqList
    })
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

  minimize() {
    this.isDrop = !this.isDrop
    this.dataList = Object.assign([], this.dataListDefault)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataList, event.previousIndex, event.currentIndex);
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
    let dialogReg = this.dialog.open(CreateFaqComponent, {
      width: '500px',
      maxWidth: '500px',
      height: '700px',
      data: {
      }
    })
    const sub = dialogReg.componentInstance.onCreateFaq.subscribe(() => {
      dialogReg.close()
      this.getData()
    })
    this.subscription.add(sub)
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
  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  navigateTo(id: number) {
      if (!this.isDrop){
        this.router.navigate(['settings/faq/answer'], {queryParams: {id: id}}).then(() => {
        })
      }
    }
}
