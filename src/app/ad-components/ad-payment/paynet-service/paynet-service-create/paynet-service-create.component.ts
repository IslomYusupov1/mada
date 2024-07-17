import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-service-create',
  templateUrl: './paynet-service-create.component.html',
  styleUrls: ['./paynet-service-create.component.scss']
})
export class PaynetServiceCreateComponent implements OnInit, OnDestroy {
  @Output() onCreatePaynetService = new EventEmitter<string>()
  private subscription = new Subscription()

  parentId: any;

  createPaynetForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    group: new FormControl({value: 'SERVICE', disabled: true}, Validators.required),
    serviceType: new FormControl('SIMPLE', Validators.required),
    minAmount: new FormControl('', Validators.compose([Validators.min(0)])),
    maxAmount: new FormControl('', Validators.compose([Validators.min(0)])),
    merchant: new FormControl('', Validators.required),
    checkTemplate: new FormControl(''),
    merchantParam: new FormControl(''),
    cashbackRate: new FormControl('0', Validators.compose([Validators.min(0)])),
    keyInfo: new FormControl(''),
    keyPay: new FormControl(''),
    forMyHome: new FormControl(false),
    autoPay: new FormControl(false),
    editable: new FormControl(false),
    hasOverParam: new FormControl(false),
    hasInfo: new FormControl(true)
  })

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaynetService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PaynetServiceCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { serviceTypeList: Array<any>, merchantList: Array<any>, checkTemplateList: Array<any> }
  ) {
  }

  ngOnInit(): void {
    const sub = this.route.queryParams.subscribe(q => {
      if (q.id) {
        this.parentId = q.id
      } else {
        this.parentId = null
      }
    })
    this.subscription.add(sub)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  createPaynetService() {
    if (this.createPaynetForm.valid && this.parentId !== '') {
      if (this.createPaynetForm.value.cashbackRate !== 'NaN') {
        this.paymentService.serviceCreate({
          title: this.createPaynetForm.value.title,
          group: this.createPaynetForm.value.group,
          paymentServiceType: this.createPaynetForm.value.serviceType,
          minAmount: this.createPaynetForm.value.minAmount * 100,
          maxAmount: this.createPaynetForm.value.maxAmount * 100,
          parent: this.parentId,
          merchant: this.createPaynetForm.value.merchant,
          checkTemplate: (this.createPaynetForm.value.checkTemplate !== '' && this.createPaynetForm.value.checkTemplate !== 'NO_TEMPLATE') ? this.createPaynetForm.value.checkTemplate : null,
          merchantParam: this.createPaynetForm.value.merchantParam !== '' ? this.createPaynetForm.value.merchantParam : null,
          cashbackRate: this.createPaynetForm.value.cashbackRate,
          keyInfo: this.createPaynetForm.value.keyInfo !== '' ? this.createPaynetForm.value.keyInfo : null,
          keyPay: this.createPaynetForm.value.keyPay !== '' ? this.createPaynetForm.value.keyPay : null,
          forMyHome: this.createPaynetForm.value.forMyHome,
          autoPay: this.createPaynetForm.value.autoPay,
          editable: this.createPaynetForm.value.editable,
          hasOverParam: this.createPaynetForm.value.hasOverParam,
          hasInfo: this.createPaynetForm.value.hasInfo,
        }).then((res: any) => {
          if (res) {
            this.showMessage(true, 'Услуга успешно добавлена')
            this.onCreatePaynetService.emit()
          }
        })
      } else if (this.createPaynetForm.value.cashbackRate === 'NaN') {
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
