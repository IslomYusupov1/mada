import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-request-param-child-edit',
  templateUrl: './request-param-child-edit.component.html',
  styleUrls: ['./request-param-child-edit.component.scss']
})
export class RequestParamChildEditComponent implements OnInit {
  @Output() onEditParam = new EventEmitter<string>()
  typesList: Array<any> = []

  paramsForm: FormGroup = new FormGroup({
    requestParamId: new FormControl('', Validators.required),
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
    private dialogRef: MatDialogRef<RequestParamChildEditComponent>,
    private paymentService: PaynetService,
    @Inject(MAT_DIALOG_DATA) public data: {
      requestParamId: string,
      typeList: Array<any>,
      merchantList: Array<any>,
      info: any
    }
  ) {
  }

  ngOnInit(): void {
    this.paramsForm.patchValue({
      requestParamId: this.data.requestParamId,
      mask: this.data.info.mask ? this.data.info.mask : '',
      title: this.data.info.title ? this.data.info.title : '',
      type: this.data.info.type ? this.data.info.type : '',
      required: this.data.info.required ? this.data.info.required : false,
      isService: this.data.info.isService ? this.data.info.isService : false,
      isMain: this.data.info.isMain ? this.data.info.isMain : false,
      readOnly: this.data.info.readOnly ? this.data.info.readOnly : false,
      prefix: this.data.info.prefix ? this.data.info.prefix : '',
      suffix: this.data.info.suffix ? this.data.info.suffix : '',
      bind: this.data.info.bind ? this.data.info.bind : '',
      value: this.data.info.value ? this.data.info.value : '',
      merchant: this.data.info.merchant ? this.data.info.merchant : '',
      merchantParam: this.data.info.merchantParam ? this.data.info.merchantParam : '',
      canValue: this.data.info.canValue ? this.data.info.canValue : false,
      canValidate: this.data.info.canValidate ? this.data.info.canValidate : false,
      cashbackRate: this.data.info.cashbackRate ? this.data.info.cashbackRate : '0',
      isAmount: this.data.info.isAmount ? this.data.info.isAmount : false,
      infoRequired: this.data.info.infoRequired ? this.data.info.infoRequired : false,
      keyInfo: this.data.info.keyInfo ? this.data.info.keyInfo : '',
      keyPay: this.data.info.keyPay ? this.data.info.keyPay : '',
    })
    this.typesList = this.data.typeList
  }

  editRequestParam() {
    if (this.paramsForm.valid) {
      if (this.paramsForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceRequestParamEdit({
          requestParamId: this.paramsForm.value.requestParamId,
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
            this.showMessage(true, 'Параметр запроса успешно редактирован!')
            this.onEditParam.emit()
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
