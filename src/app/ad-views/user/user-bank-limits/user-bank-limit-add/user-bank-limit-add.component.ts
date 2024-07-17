import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../ad-services/user.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-user-bank-limit-add',
  templateUrl: './user-bank-limit-add.component.html',
  styles: []
})
export class UserBankLimitAddComponent implements OnInit {
  @Output() onAddLimit: EventEmitter<any> = new EventEmitter<any>()
  operationCodeList: Array<{ code: string, name: string }> = []
  editLimitForm: FormGroup = this.fb.group({
    operationType: ['', Validators.required],
    cardType: ['', Validators.required],
    operationCode: [{value: '', disabled: true}, Validators.required],
    periodType: ['', Validators.required],
    amountLimit: [{value: null, disabled: false}, Validators.required],
    countLimit: [{value: null, disabled: false}, Validators.required],
    unlimitedCount: false,
    unlimitedAmount: false
  })

  constructor(
    private fb: FormBuilder,
    private hrService: HrService,
    private dialogRef: MatDialogRef<UserBankLimitAddComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {
      operationTypeList: Array<string>,
      cardTypeList: Array<string>,
      periodTypeList: Array<string>,
      bankId: number
    }
  ) {
  }

  ngOnInit(): void {
  }

  operationTypeChanged(event: any): void {
    console.log(event.value)
    if (!this.editLimitForm.value.operationType || !this.editLimitForm.value.cardType) {
      return;
    }
    if (this.editLimitForm.value.operationType && this.editLimitForm.value.cardType) {
      this.editLimitForm.patchValue({
        operationCode: ''
      })
      this.userService.userBankTransactionOperationCodeList({
        bankId: this.data.bankId,
        operationType: this.editLimitForm.value.operationType,
        cardType: this.editLimitForm.value.cardType
      }).then((res: any) => {
        if (res) {
          this.operationCodeList = res.operationCodes
          this.operationCodeList.unshift({code: 'ALL', name: ''})
          this.editLimitForm.get('operationCode')?.enable()
        } else {
          this.operationCodeList = []
        }
      })
    }
  }

  changeCountLimit(event: any) {
    if (event.checked) {
      this.editLimitForm.patchValue({
        countLimit: null,
        unlimitedCount: event.checked
      })
      this.editLimitForm.get('countLimit')?.disable()
    } else {
      this.editLimitForm.get('countLimit')?.enable()
    }
  }

  changeAmountLimit(event: any) {
    if (event.checked) {
      this.editLimitForm.patchValue({
        amountLimit: null,
        unlimitedAmount: event.checked
      })
      this.editLimitForm.get('amountLimit')?.disable()
    } else {
      this.editLimitForm.get('amountLimit')?.enable()
    }
  }

  addLimit(): void {
    if (this.editLimitForm.valid) {
      this.userService.userBankTransactionLimitAdd({
        bankId: this.data.bankId,
        operationType: this.editLimitForm.value.operationType,
        operationCode: this.editLimitForm.value.operationCode,
        cardType: this.editLimitForm.value.cardType,
        periodType: this.editLimitForm.value.periodType,
        countLimit: this.editLimitForm.value.unlimitedCount ? Number(-1) : this.editLimitForm.value.countLimit,
        amountLimit: this.editLimitForm.value.unlimitedAmount ? Number(-1) : (this.editLimitForm.value.amountLimit * 100),
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно добавлен!')
          this.onAddLimit.emit()
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close()
  }

}
