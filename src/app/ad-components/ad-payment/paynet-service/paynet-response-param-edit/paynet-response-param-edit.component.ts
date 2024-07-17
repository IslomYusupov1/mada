import {EventEmitter, Inject, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-response-param-edit',
  templateUrl: './paynet-response-param-edit.component.html',
  styleUrls: ['./paynet-response-param-edit.component.scss']
})
export class PaynetResponseParamEditComponent implements OnInit {
  @Output() onEdit = new EventEmitter<string>()

  responseForm: FormGroup = new FormGroup({
    responseParamId: new FormControl('', Validators.required),
    mask: new FormControl(''),
    title: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    isBalance: new FormControl(false),
    isCommission: new FormControl(false),
    isPayAmount: new FormControl(false),
    isMinusBalance: new FormControl(false),
    isMain: new FormControl(false),
    keyInfo: new FormControl(''),
    keyPay: new FormControl(''),
  })

  constructor(
    private dialogRef: MatDialogRef<PaynetResponseParamEditComponent>,
    private paymentService: PaynetService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      responseId: string,
      typeList: Array<any>,
      info: any
    }
  ) {
  }

  ngOnInit(): void {
    this.responseForm.patchValue({
      responseParamId: this.data.responseId,
      mask: this.data.info.mask ? this.data.info.mask : '',
      title: this.data.info.title ? this.data.info.title : '',
      type: this.data.info.type ? this.data.info.type : '',
      isBalance: this.data.info.isBalance ? this.data.info.isBalance : false,
      isCommission: this.data.info.isCommission ? this.data.info.isCommission : false,
      isPayAmount: this.data.info.isPayAmount ? this.data.info.isPayAmount : false,
      isMinusBalance: this.data.info.isMinusBalance ? this.data.info.isMinusBalance : false,
      isMain: this.data.info.isMain ? this.data.info.isMain : false,
      keyInfo: this.data.info.keyInfo ? this.data.info.keyInfo : '',
      keyPay: this.data.info.keyPay ? this.data.info.keyPay : '',
    })
  }

  editResponseParam() {
    if (this.responseForm.valid) {
      this.paymentService.serviceResponseParamEdit({
        responseParamId: this.responseForm.value.responseParamId,
        mask: this.responseForm.value.mask !== '' ? this.responseForm.value.mask : null,
        title: this.responseForm.value.title,
        type: this.responseForm.value.type,
        isBalance: this.responseForm.value.isBalance,
        isCommission: this.responseForm.value.isCommission,
        isPayAmount: this.responseForm.value.isPayAmount,
        isMinusBalance: this.responseForm.value.isMinusBalance,
        isMain: this.responseForm.value.isMain,
        keyInfo: this.responseForm.value.keyInfo !== '' ? this.responseForm.value.keyInfo : null,
        keyPay: this.responseForm.value.keyPay !== '' ? this.responseForm.value.keyPay : null,
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Параметр ответа успешно редактирован!')
          this.onEdit.emit()
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
