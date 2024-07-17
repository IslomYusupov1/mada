import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FaqService} from "../../../ad-services/faq.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-answer-faq-edit-dialog',
  templateUrl: './answer-faq-edit-dialog.component.html',
  styles: [
  ]
})
export class AnswerFaqEditDialogComponent implements OnInit {

  @Output() onEditAnswerFaq  = new EventEmitter<void>()
  faqEditForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    id: new FormControl('',Validators.required),
    actionType: new FormControl(''),
    actionText: new FormControl('')
  })

  constructor(
    private _faqService: FaqService,
    private dialogRef: MatDialogRef<AnswerFaqEditDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      title: string,
      actionType: string,
      actionText: string,
    }
  ) { }

  ngOnInit(): void {

    this.faqEditForm.patchValue({
      text: this.data.title,
      id: this.data.id,
      actionType: this.data.actionType?this.data.actionType : '',
      actionText: this.data.actionText?this.data.actionText : ''
    })
  }
  editAnswerFaq() {
    if (this.faqEditForm.valid && this.data.id) {
      this._faqService.answerFaqEdit(this.faqEditForm.value).then((res: any) => {
        if (res) {
          this.showMessage(true,'Faq успешно изменена')
          this.onEditAnswerFaq.emit()
        }
      })
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
