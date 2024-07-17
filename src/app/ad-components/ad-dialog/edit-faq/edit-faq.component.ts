import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaynetService} from "../../../ad-services/paynet.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../ad-status-dialog/ad-status-dialog.component";
import {FaqService} from "../../../ad-services/faq.service";

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styles: [
  ]
})
export class EditFaqComponent implements OnInit {
@Output() onEditFaq  = new EventEmitter<void>()
  faqEditForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    id: new FormControl('',Validators.required),
    visible: new FormControl('')
  })

  constructor(
    private _faqService: FaqService,
    private dialogRef: MatDialogRef<EditFaqComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      title: string,
      visible: string,
    }
  ) { }

  ngOnInit(): void {

    this.faqEditForm.patchValue({
      text: this.data.title,
      id: this.data.id,
      visible: this.data.visible
    })
  }
  getLanguage(visible:string){
  switch (visible){
    case "VISIBLE":
      return "Видимый"
    case "INVISIBLE":
      return "Невидимый"
  }
  return visible
  }
  editCategory() {
    if (this.faqEditForm.valid && this.data.id) {
      this._faqService.editFaq(this.faqEditForm.value).then((res: any) => {
        if (res) {
          this.showMessage(true,'Faq успешно изменена')
          this.onEditFaq.emit()
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
