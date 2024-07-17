import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";
import {PaynetService} from "../../../../ad-services/paynet.service";

@Component({
  selector: 'app-category-title-dialog',
  templateUrl: './category-title-dialog.component.html',
  styleUrls: ['./category-title-dialog.component.scss']
})
export class CategoryTitleDialogComponent implements OnInit {
  @Output() onTranslateTitle = new EventEmitter<string>()

  titleTranslationForm: FormGroup = new FormGroup({
    RUS: new FormControl('', Validators.required),
    UZB: new FormControl('', Validators.required),
    ENG: new FormControl('', Validators.required),
    KAA: new FormControl('', Validators.required),
    KRL: new FormControl('', Validators.required),
  })

  constructor(
    private dialogRef: MatDialogRef<CategoryTitleDialogComponent>,
    private dialog: MatDialog,
    private paynetService: PaynetService,
    @Inject(MAT_DIALOG_DATA) public data: { translates: any, id: string, type: string }
  ) {
  }

  ngOnInit(): void {
    this.titleTranslationForm.patchValue({
      RUS: this.data.translates.RUS ? this.data.translates.RUS : '',
      UZB: this.data.translates.UZB ? this.data.translates.UZB : '',
      ENG: this.data.translates.ENG ? this.data.translates.ENG : '',
      KAA: this.data.translates.KAA ? this.data.translates.KAA : '',
      KRL: this.data.translates.KRL ? this.data.translates.KRL : ''
    })
  }

  saveTranslate() {
    if (this.titleTranslationForm.valid) {
      if (this.data.type === 'CATEGORY') {
        this.paynetService.categoryTitleTranslate({
          titleTranslate: this.titleTranslationForm.value,
          paymentCategoryId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Название успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      } else if (this.data.type === 'SERVICE') {
        this.paynetService.serviceTitleTranslate({
          titleTranslate: this.titleTranslationForm.value,
          paymentServiceId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Название успешно сохранено!')
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
