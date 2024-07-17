import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-paynet-request-params-create',
  templateUrl: './paynet-request-params-create.component.html',
  styleUrls: ['./paynet-request-params-create.component.scss']
})
export class PaynetRequestParamsCreateComponent implements OnInit {
  typesList: Array<any> = []
  merchantList: Array<any> = []

  paramsForm: FormGroup = new FormGroup({
    paymentServiceId: new FormControl('', Validators.required),
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
    private paymentService: PaynetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      if (q.id) {
        this.paramsForm.patchValue({
          paymentServiceId: q.id
        })
      }
    })
    this.getTypeList()
    this.getMerchantList()
  }

  getTypeList() {
    this.paymentService.paymentFieldTypeList().then((res: any) => {
      if (res) {
        this.typesList = res.fieldTypes
      }
    })
  }

  getMerchantList() {
    this.paymentService.getPaymentMerchantList().then((res: any) => {
      if (res) {
        this.merchantList = res.serviceTypes
      }
    })
  }

  createRequestParam() {
    if (this.paramsForm.valid) {
      if (this.paramsForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceRequestParamCreate({
          paymentServiceId: this.paramsForm.value.paymentServiceId,
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
          cashbackRate: Number(this.paramsForm.value.cashbackRate),
          isAmount: this.paramsForm.value.isAmount,
          infoRequired: this.paramsForm.value.infoRequired,
          keyInfo: this.paramsForm.value.keyInfo !== '' ? this.paramsForm.value.keyInfo : null,
          keyPay: this.paramsForm.value.keyPay !== '' ? this.paramsForm.value.keyPay : null,
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Параметр запроса успешно добавлен')
            setTimeout(() => {
              this.back()
            }, 1500)
          }
        })
      } else if (this.paramsForm.value.cashbackRate === 'NaN') {
        this.showMessage(false, 'В ставке кэшбэка нельзя использовать запятые')
      }
    }
  }

  back() {
    this.location.back()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
