import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-reponse-param-create',
  templateUrl: './paynet-reponse-param-create.component.html',
  styleUrls: ['./paynet-reponse-param-create.component.scss']
})
export class PaynetReponseParamCreateComponent implements OnInit {
  @Output() onCreate = new EventEmitter<string>()

  responseForm: FormGroup = new FormGroup({
    paymentServiceId: new FormControl('', Validators.required),
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
    private dialogRef: MatDialogRef<PaynetReponseParamCreateComponent>,
    private paymentService: PaynetService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceId: string,
      typeList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    this.responseForm.patchValue({
      paymentServiceId: this.data.serviceId
    })
  }

  createResponseParam() {
    if (this.responseForm.valid) {
      this.paymentService.createResponseParam({
        paymentServiceId: this.responseForm.value.paymentServiceId,
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
          this.showMessage(true, 'Параметр ответа успешно добавлен!')
          this.onCreate.emit()
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
