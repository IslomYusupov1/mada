import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-request-param-child-create',
  templateUrl: './request-param-child-create.component.html',
  styleUrls: ['./request-param-child-create.component.scss']
})
export class RequestParamChildCreateComponent implements OnInit {
  @Output() onCreateParam = new EventEmitter<string>()
  typesList: Array<any> = []

  paramsForm: FormGroup = new FormGroup({
    paymentServiceId: new FormControl('', Validators.required),
    parent: new FormControl('', Validators.required),
    mask: new FormControl(''),
    title: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    required: new FormControl(false),
    isService: new FormControl(false),
    isMain: new FormControl(false),
    readOnly: new FormControl(false),
    prefix: new FormControl(''),
    suffix: new FormControl(''),
    bind: new FormControl(''),
    value: new FormControl(''),
    merchant: new FormControl('', Validators.required),
    merchantParam: new FormControl(''),
    canValue: new FormControl(false),
    canValidate: new FormControl(false),
    cashbackRate: new FormControl('0', Validators.compose([Validators.min(0)])),
    isAmount: new FormControl(false),
    infoRequired: new FormControl(false),
    keyInfo: new FormControl(''),
    keyPay: new FormControl(''),
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RequestParamChildCreateComponent>,
    private paymentService: PaynetService,
    @Inject(MAT_DIALOG_DATA) public data: {
      requestId: string,
      parentId: string,
      typeList: Array<any>,
      merchantList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.requestId && this.data.parentId) {
      this.paramsForm.patchValue({
        paymentServiceId: this.data.requestId,
        parent: this.data.parentId
      })
    }
    this.typesList = this.data.typeList
  }

  createRequestParam() {
    if (this.paramsForm.valid) {
      if (this.paramsForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceRequestParamCreate({
          paymentServiceId: this.paramsForm.value.paymentServiceId,
          parent: this.paramsForm.value.parent,
          mask: this.paramsForm.value.mask !== '' ? this.paramsForm.value.mask : null,
          title: this.paramsForm.value.title,
          type: this.paramsForm.value.type,
          required: this.paramsForm.value.required,
          isService: this.paramsForm.value.isService,
          isMain: this.paramsForm.value.isMain,
          readOnly: this.paramsForm.value.readOnly,
          prefix: this.paramsForm.value.prefix !== '' ? this.paramsForm.value.prefix : null,
          suffix: this.paramsForm.value.suffix !== '' ? this.paramsForm.value.suffix : null,
          bind: this.paramsForm.value.bind !== '' ? this.paramsForm.value.bind : null,
          value: this.paramsForm.value.value !== '' ? this.paramsForm.value.value : null,
          merchant: this.paramsForm.value.merchant,
          merchantParam: this.paramsForm.value.merchantParam !== '' ? this.paramsForm.value.merchantParam : null,
          canValue: this.paramsForm.value.canValue,
          canValidate: this.paramsForm.value.canValidate,
          cashbackRate: this.paramsForm.value.cashbackRate,
          isAmount: this.paramsForm.value.isAmount,
          infoRequired: this.paramsForm.value.infoRequired,
          keyInfo: this.paramsForm.value.keyInfo !== '' ? this.paramsForm.value.keyInfo : null,
          keyPay: this.paramsForm.value.keyPay !== '' ? this.paramsForm.value.keyPay : null,
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Опция добавлена успешно')
            this.onCreateParam.emit()
          }
        })
      } else if (this.paramsForm.value.cashbackRate === 'NaN') {
        this.showMessage(false, 'В ставке кэшбэка нельзя использовать запятые')
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
