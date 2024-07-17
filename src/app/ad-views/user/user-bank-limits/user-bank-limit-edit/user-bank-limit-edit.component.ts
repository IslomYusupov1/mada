import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../ad-services/user.service";

@Component({
  selector: 'app-user-bank-limit-edit',
  templateUrl: './user-bank-limit-edit.component.html',
  styles: []
})
export class UserBankLimitEditComponent implements OnInit {
  @Output() onEditLimit: EventEmitter<any> = new EventEmitter<any>()
  editLimitForm: FormGroup = this.fb.group({
    operationType: '',
    cardType: '',
    operationCode: '',
    periodType: '',
    amountLimit: [{value: null, disabled: false}, Validators.required],
    countLimit: [{value: null, disabled: false}, Validators.required],
    unlimitedCount: false,
    unlimitedAmount: false
  })
  limitId!: number

  constructor(
    private fb: FormBuilder,
    private hrService: HrService,
    private dialogRef: MatDialogRef<UserBankLimitEditComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: any
    }
  ) {
  }

  ngOnInit(): void {
    this.patchData()
  }

  editLimit(): void {
    if (this.editLimitForm.valid) {
      this.userService.userBankTransactionLimitEdit({
        id: this.limitId,
        amountLimit: this.editLimitForm.value.unlimitedAmount ? Number(-1) : (this.editLimitForm.value.amountLimit * 100),
        countLimit: this.editLimitForm.value.unlimitedCount ? Number(-1) : this.editLimitForm.value.countLimit
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,res.message ? res.message : 'Успешно обновлен')
          this.onEditLimit.emit()
        }
      })
    }
  }

  patchData(): void {
    this.editLimitForm.patchValue({
      operationType: this.data.item.operationType,
      cardType: this.data.item.cardType,
      operationCode: this.data.item.operationCode,
      periodType: this.data.item.periodType,
      countLimit: this.data.item.countLimit !== -1 ? this.data.item.countLimit : null,
      amountLimit: this.data.item.amountLimit !== -1 ? this.data.item.amountLimit / 100 : null,
      unlimitedAmount: this.data.item.amountLimit === -1,
      unlimitedCount: this.data.item.countLimit === -1
    })
    this.limitId = this.data.item.id

    if (this.data.item.amountLimit === -1) {
      this.editLimitForm.get('amountLimit')?.disable()
    } else {
      this.editLimitForm.get('amountLimit')?.enable()
    }

    if (this.data.item.countLimit === -1) {
      this.editLimitForm.get('countLimit')?.disable()
    } else {
      this.editLimitForm.get('countLimit')?.enable()
    }
  }

  changeCountLimit(event: any): void {
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

  changeAmountLimit(event: any): void {
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

  close(): void {
    this.dialogRef.close()
  }
}
