import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-response-param-title-translate',
  templateUrl: './response-param-title-translate.component.html',
  styleUrls: ['./response-param-title-translate.component.scss']
})
export class ResponseParamTitleTranslateComponent implements OnInit {
  @Output() onTranslateTitle = new EventEmitter<string>()

  titleTranslationForm: FormGroup = new FormGroup({
    RUS: new FormControl('', Validators.required),
    UZB: new FormControl('', Validators.required),
    ENG: new FormControl('', Validators.required),
    KAA: new FormControl('', Validators.required),
    KRL: new FormControl('', Validators.required),
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ResponseParamTitleTranslateComponent>,
    private paymentService: PaynetService,
    @Inject(MAT_DIALOG_DATA) public data: {
      uuid: string,
      translates: any
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.translates && Object.keys(this.data.translates).length !== 0) {
      this.titleTranslationForm.patchValue({
        RUS: this.data.translates.RUS,
        UZB: this.data.translates.UZB,
        ENG: this.data.translates.ENG,
        KAA: this.data.translates.KAA,
        KRL: this.data.translates.KRL
      })
    }
  }

  saveTranslate() {
    if (this.titleTranslationForm.valid) {
      this.paymentService.serviceResponseParamTranslates({
        titleTranslate: this.titleTranslationForm.value,
        responseParamId: this.data.uuid
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Название успешно сохранено!')
          this.onTranslateTitle.emit()
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
