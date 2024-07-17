import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {FaqService} from "../../../ad-services/faq.service";
import {PointService} from "../../../ad-services/point.service";

@Component({
  selector: 'app-translate-faq-dialog',
  templateUrl: './translate-faq-dialog.component.html',
  styles: [
  ]
})
export class TranslateFaqDialogComponent implements OnInit {

  @Output() onTranslateTitle = new EventEmitter<string>()

  titleTranslationForm: FormGroup = new FormGroup({
    RUS: new FormControl('', Validators.required),
    UZB: new FormControl('', Validators.required),
    ENG: new FormControl('', Validators.required),
    KAA: new FormControl('', Validators.required),
  })

  constructor(
    private dialogRef: MatDialogRef<TranslateFaqDialogComponent>,
    private dialog: MatDialog,
    private _faqService: FaqService,
    private _pointService:PointService,
    @Inject(MAT_DIALOG_DATA) public data: { translates: any, id: number, type: string }
  ) {
  }

  ngOnInit(): void {
    this.titleTranslationForm.patchValue({
      RUS: this.data.translates.RUS ? this.data.translates.RUS : '',
      UZB: this.data.translates.UZB ? this.data.translates.UZB : '',
      ENG: this.data.translates.ENG ? this.data.translates.ENG : '',
      KAA: this.data.translates.KAA ? this.data.translates.KAA : '',
    })
  }

  saveTranslate() {
    if (this.titleTranslationForm.valid) {
      if (this.data.type === 'FAQ') {
        this._faqService.translateFaq({
          titleTranslate: this.titleTranslationForm.value,
          questionId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Название успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      } else if (this.data.type === 'ANSWER') {
        this._faqService.answerFaqTranslate({
          titleTranslate: this.titleTranslationForm.value,
          answerId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Название успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      }
      else if (this.data.type === 'ACCOUNT') {
        this._pointService.productAccountTranslate({
          titleTranslate: this.titleTranslationForm.value,
          id: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Название успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      }
      else {
        this._faqService.answerFaqActionTranslate({
          titleTranslate: this.titleTranslationForm.value,
          answerId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Текст действия успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      }
    }
  }

  close() {
    this.dialogRef.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }


}
