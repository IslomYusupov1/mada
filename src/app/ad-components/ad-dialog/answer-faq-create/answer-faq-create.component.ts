import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {FaqService} from "../../../ad-services/faq.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-answer-faq-create',
  templateUrl: './answer-faq-create.component.html',
  styles: [
  ]
})
export class AnswerFaqCreateComponent implements OnInit {
  @Output() onCreateFaq = new EventEmitter<string>()
  parent: any;

  faqCreateForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    actionType: new FormControl(''),
    actionText: new FormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private _faqService: FaqService,
    private dialogRef: MatDialogRef<AnswerFaqCreateComponent>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      console.log(q)
      if (q.id) {
        this.parent = q.id
      } else {
        this.parent = null
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  createFaq() {
    if (this.faqCreateForm.valid) {
      this._faqService.answerFaqCreate(this.parent, this.faqCreateForm.value.text,this.faqCreateForm.value.actionType,this.faqCreateForm.value.actionText).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Faq успешно создана')
          this.onCreateFaq.emit()
        }
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

}
