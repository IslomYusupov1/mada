import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FaqService} from "../../../../ad-services/faq.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TranslateFaqDialogComponent} from "../../../../ad-components/ad-dialog/translate-faq-dialog/translate-faq-dialog.component";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {AnswerFaqEditDialogComponent} from "../../../../ad-components/ad-dialog/answer-faq-edit-dialog/answer-faq-edit-dialog.component";import {AnswerFaqCreateComponent} from "../../../../ad-components/ad-dialog/answer-faq-create/answer-faq-create.component";
@Component({
  selector: 'app-answer-for-questions',
  templateUrl: './answer-for-questions.component.html',
  styles: [
  ]
})
export class AnswerForQuestionsComponent implements OnInit , OnDestroy {
  data:any
  catId!: number
  visible: string = ''
  categoryName: string = ''
  isDrop: boolean = false
  serviceTypes: Array<any> = []
  merchantList: Array<any> = []

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
      this.getQuestionName()
      this.getData()
    })
    this.subscription.add(sub)
  }

  getQuestionName() {
    this._faqService.getOneFaq(this.catId).then((res: any) => {
      this.categoryName = res.title
    })
  }
  getData(){
    this._faqService.answerFaq(this.catId).then((res:any)=>{
    if (res){
      this.data = res
    }
    })
  }
  openEditDialog(id: number) {
    this._faqService.answerFaqOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(AnswerFaqEditDialogComponent, {
          width: '500px',
          maxWidth: '500px',
          data: {
            title: res.text,
            id: res.id,
            actionType:res.actionType,
            actionText:res.actionText
          }
        })
        const sub = dialogRef.componentInstance.onEditAnswerFaq.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })

  }




  categoryTitleDialog(id: number) {
    this._faqService.answerFaqOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(TranslateFaqDialogComponent, {
          width: '900px',
          maxWidth: '900px',
          data: {
            translates: res.translates? res.translates : '',
            id: res.id,
            type:"ANSWER"
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
  categoryActionTextDialog(id: number) {
    this._faqService.answerFaqOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(TranslateFaqDialogComponent, {
          width: '900px',
          maxWidth: '900px',
          data: {
            translates: res.actionTranslates? res.actionTranslates : '',
            id: res.id,
            type:"ACTION"
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


  navigateTo(id: number) {this.router.navigate(['settings/faq/answer-question'], {queryParams: {id: id}}).then(() => {})}
  openCreateCategoryDialog() {
    let dialogRef = this.dialog.open(AnswerFaqCreateComponent, {
      width: '500px',
      maxWidth: '500px',
    })
    const sub = dialogRef.componentInstance.onCreateFaq.subscribe(() => {
      dialogRef.close()
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
