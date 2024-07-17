import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-service-edit',
  templateUrl: './paynet-service-edit.component.html',
  styleUrls: ['./paynet-service-edit.component.scss']
})
export class PaynetServiceEditComponent implements OnInit {
  @Output() onEditService = new EventEmitter<string>()

  editPaynetForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    group: new FormControl({value: 'SERVICE', disabled: true}, Validators.required),
    serviceTypes: new FormControl('SIMPLE', Validators.required),
    minAmount: new FormControl('', Validators.compose([Validators.min(0)])),
    maxAmount: new FormControl('', Validators.compose([Validators.min(0)])),
    merchant: new FormControl('', Validators.required),
    checkTemplate: new FormControl(''),
    merchantParam: new FormControl(''),
    cashbackRate: new FormControl('', Validators.compose([Validators.min(0)])),
    keyInfo: new FormControl(''),
    keyPay: new FormControl(''),
    forMyHome: new FormControl(false),
    autoPay: new FormControl(false),
    editable: new FormControl(false),
    hasOverParam: new FormControl(false),
    technicalWorks: new FormControl(false),
    hasInfo: new FormControl(false)
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PaynetServiceEditComponent>,
    private paymentService: PaynetService,
    @Inject(MAT_DIALOG_DATA) public data: {
      resData: any,
      serviceTypes: Array<any>,
      merchantList: Array<any>,
      checkTemplateList: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.resData) {
      this.editPaynetForm.patchValue({
        title: this.data.resData.title,
        group: this.data.resData.group,
        serviceTypes: this.data.resData.paymentServiceType,
        minAmount: this.data.resData.minAmount.amount / 100,
        maxAmount: this.data.resData.maxAmount.amount / 100,
        merchant: this.data.resData.merchant,
        checkTemplate: this.data.resData.checkTemplate ? this.data.resData.checkTemplate : '',
        merchantParam: this.data.resData.merchantParam ? this.data.resData.merchantParam : '',
        cashbackRate: this.data.resData.cashbackRate,
        keyInfo: this.data.resData.keyInfo,
        keyPay: this.data.resData.keyPay,
        forMyHome: this.data.resData.forMyHome,
        autoPay: this.data.resData.autoPay,
        editable: this.data.resData.editable,
        hasOverParam: this.data.resData.hasOverParam,
        technicalWorks: this.data.resData.technicalWorks,
        hasInfo: this.data.resData.hasInfo
      })
    }
  }

  editPaynetService() {
    if (this.editPaynetForm.valid && this.data.resData.uuid) {
      if (this.editPaynetForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceEdit({
          paymentServiceId: this.data.resData.uuid,
          title: this.editPaynetForm.value.title,
          group: this.editPaynetForm.value.group,
          paymentServiceType: this.editPaynetForm.value.serviceTypes,
          minAmount: this.editPaynetForm.value.minAmount * 100,
          maxAmount: this.editPaynetForm.value.maxAmount * 100,
          merchant: this.editPaynetForm.value.merchant,
          checkTemplate: (this.editPaynetForm.value.checkTemplate !== '' && this.editPaynetForm.value.checkTemplate !== 'NO_TEMPLATE') ? this.editPaynetForm.value.checkTemplate : null,
          merchantParam: this.editPaynetForm.value.merchantParam !== '' ? this.editPaynetForm.value.merchantParam : null,
          cashbackRate: this.editPaynetForm.value.cashbackRate,
          keyInfo: this.editPaynetForm.value.keyInfo !== '' ? this.editPaynetForm.value.keyInfo : null,
          keyPay: this.editPaynetForm.value.keyPay !== '' ? this.editPaynetForm.value.keyPay : null,
          forMyHome: this.editPaynetForm.value.forMyHome,
          autoPay: this.editPaynetForm.value.autoPay,
          editable: this.editPaynetForm.value.editable,
          hasOverParam: this.editPaynetForm.value.hasOverParam,
          technicalWorks: this.editPaynetForm.value.technicalWorks,
          hasInfo: this.editPaynetForm.value.hasInfo
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, "Сервис успешно изменен")
            this.onEditService.emit()
          }
        })
      } else if (this.editPaynetForm.value.cashbackRate === 'NaN') {
        this.showMessage(false,'В ставке кэшбэка нельзя использовать запятые')
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
