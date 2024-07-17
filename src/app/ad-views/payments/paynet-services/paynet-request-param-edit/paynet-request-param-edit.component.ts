import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-request-param-edit',
  templateUrl: './paynet-request-param-edit.component.html',
  styleUrls: ['./paynet-request-param-edit.component.scss']
})
export class PaynetRequestParamEditComponent implements OnInit {
  typesList: Array<any> = []
  merchantList: Array<any> = []

  paramEditForm: FormGroup = new FormGroup({
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
    private paymentService: PaynetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      this.paramEditForm.patchValue({
        requestParamId: q.id
      })
      this.getServiceOne(q.id)
      this.getTypeList()
      this.getMerchantList()
    })
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

  getServiceOne(id: string) {
    this.paymentService.serviceRequestParamGetOne(id).then((res: any) => {
      if (res) {
        this.paramEditForm.patchValue({
          mask: res.mask ? res.mask : '',
          title: res.title ? res.title : '',
          type: res.type ? res.type : '',
          required: res.required,
          isService: res.isService,
          isMain: res.isMain,
          readOnly: res.readOnly,
          prefix: res.prefix ? res.prefix : '',
          suffix: res.suffix ? res.suffix : '',
          bind: res.bind ? res.bind : '',
          value: res.value ? res.value : '',
          merchant: res.merchant ? res.merchant : '',
          merchantParam: res.merchantParam ? res.merchantParam : '',
          canValue: res.canValue,
          canValidate: res.canValidate,
          cashbackRate: res.cashbackRate ? res.cashbackRate : '0',
          isAmount: res.isAmount,
          infoRequired: res.infoRequired,
          keyInfo: res.keyInfo ? res.keyInfo : '',
          keyPay: res.keyPay ? res.keyPay : '',
        })
      }
    })
  }

  editRequestParam() {
    if (this.paramEditForm.valid) {
      if (this.paramEditForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceRequestParamEdit({
          requestParamId: this.paramEditForm.value.requestParamId,
          mask: this.paramEditForm.value.mask !== '' ? this.paramEditForm.value.mask : null,
          title: this.paramEditForm.value.title,
          type: this.paramEditForm.value.type,
          required: this.paramEditForm.value.required,
          isService: this.paramEditForm.value.isService,
          isMain: this.paramEditForm.value.isMain,
          readOnly: this.paramEditForm.value.readOnly,
          prefix: this.paramEditForm.value.prefix !== '' ? this.paramEditForm.value.prefix : null,
          suffix: this.paramEditForm.value.suffix !== '' ? this.paramEditForm.value.suffix : null,
          bind: this.paramEditForm.value.bind !== '' ? this.paramEditForm.value.bind : null,
          value: this.paramEditForm.value.value !== '' ? this.paramEditForm.value.value : null,
          merchant: this.paramEditForm.value.merchant,
          merchantParam: this.paramEditForm.value.merchantParam !== '' ? this.paramEditForm.value.merchantParam : null,
          canValue: this.paramEditForm.value.canValue,
          canValidate: this.paramEditForm.value.canValidate,
          cashbackRate: Number(this.paramEditForm.value.cashbackRate),
          isAmount: this.paramEditForm.value.isAmount,
          infoRequired: this.paramEditForm.value.infoRequired,
          keyInfo: this.paramEditForm.value.keyInfo !== '' ? this.paramEditForm.value.keyInfo : null,
          keyPay: this.paramEditForm.value.keyPay !== '' ? this.paramEditForm.value.keyPay : null,
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Параметр запроса успешно редактирован!')
            setTimeout(() => {
              this.back()
            }, 1500)
          }
        })
      } else if (this.paramEditForm.value.cashbackRate === 'NaN') {
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
