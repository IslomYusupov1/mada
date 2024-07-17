import {AfterContentInit, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserService} from "../../../../ad-services/user.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-create-vip-limit-dialog',
  templateUrl: './create-vip-limit-dialog.component.html',
  styleUrls: ['./create-vip-limit-dialog.component.scss']
})
export class CreateVipLimitDialogComponent implements OnInit, AfterContentInit {
  @Output() onAddLimit = new EventEmitter<any>()
  operationCodes: Array<any> = []
  limitCreateForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateVipLimitDialogComponent>,
    private userService: UserService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      periods: Array<string>,
      types: Array<string>,
      userId: string,
      cardTypes: Array<any>,
      bankList: Array<any>,
    }
  ) {
    this.limitCreateForm = this.fb.group({
      operationType: ['', [Validators.required]],
      operationCode: [{value: '', disabled: true}, [Validators.required]],
      bankId: [null, Validators.required],
      cardType: ['', Validators.required],
      transactionLimits: this.fb.array([])
    })
    if (this.data.periods) {
      for (let i = 0; i < this.data.periods.length; i++) {
        const limit = this.fb.group({
          periodType: this.data.periods[i],
          amountLimit: [{value: null, disabled: false}],
          unlimitedAmount: false,
          countLimit: [{value: null, disabled: false}],
          unlimitedCount: false
        })
        this.limits.push(limit)
      }
    }
  }

  get limits() {
    return this.limitCreateForm.get('transactionLimits') as FormArray
  }

  changeAmountCheckbox(event: MatCheckboxChange, ind: number) {
    let amount = this.limits.controls[ind].get('amountLimit')
    if (event.checked) {
      amount?.disable()
    } else {
      amount?.enable()
    }
  }

  changeCountCheckbox(event: MatCheckboxChange, ind: number) {
    let count = this.limits.controls[ind].get('countLimit')
    if (event.checked) {
      count?.disable()
    } else {
      count?.enable()
    }
  }

  changeOperationType(event: any) {
    console.log(event.value)
    if (this.limitCreateForm.value.bankId && this.limitCreateForm.value.operationType && this.limitCreateForm.value.cardType) {
      this.limitCreateForm.patchValue({
        operationCode: ''
      })
      let obj = {
        bankId: this.limitCreateForm.value.bankId,
        operationType: this.limitCreateForm.value.operationType,
        cardType: this.limitCreateForm.value.cardType
      }
      this.getOperationCodeList(obj)
    }
  }

  getOperationCodeList(obj: { bankId: number, operationType: string, cardType: string }) {
    let operationCodes = this.limitCreateForm.get('operationCode')
    this.userService.userBankTransactionOperationCodeList(obj).then((res: any) => {
      if (res) {
        this.operationCodes = res.operationCodes
        this.operationCodes.unshift({code: 'ALL', name: ''})
        operationCodes?.enable()
      } else {
        this.operationCodes = []
        operationCodes?.disable()
      }
    })
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  createLimit() {
    if (this.limitCreateForm.valid) {
      let limitsArray: any[] = []
      const limits = this.limitCreateForm.value.transactionLimits
      limits.forEach((limit: any) => {
        const obj = {
          periodType: limit.periodType,
          amountLimit: limit.amountLimit ? limit.amountLimit * 100 : null,
          unlimitedAmount: limit.unlimitedAmount,
          countLimit: limit.countLimit ? limit.countLimit : null,
          unlimitedCount: limit.unlimitedCount
        }
        limitsArray.push(obj)
      })
      const reqObj = {
        bankId: this.limitCreateForm.value.bankId,
        cardType: this.limitCreateForm.value.cardType,
        operationType: this.limitCreateForm.value.operationType,
        operationCode: this.limitCreateForm.value.operationCode,
        userId: this.data.userId,
        transactionLimits: limitsArray
      }
      this.userService.vipUserTransactionLimitAdd(reqObj).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно!')
          this.onAddLimit.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
