import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../ad-services/user.service";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-edit-vip-limit-dialog',
  templateUrl: './edit-vip-limit-dialog.component.html',
  styleUrls: ['./edit-vip-limit-dialog.component.scss']
})
export class EditVipLimitDialogComponent implements OnInit {
  @Output() onEditLimit = new EventEmitter<any>()
  limitEditForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditVipLimitDialogComponent>,
    private userService: UserService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      userId: string,
      limitInfo: any
    }
  ) {
    this.limitEditForm = this.fb.group({
      operationType: [{
        value: this.data.limitInfo.operationType,
        disabled: true
      }, [Validators.required]],
      bankName: [{
        value: this.data.limitInfo.bankOne.name,
        disabled: true
      }, [Validators.required]],
      cardType: [{
        value: this.data.limitInfo.cardType,
        disabled: true
      }, [Validators.required]],
      operationCode: [{
        value: this.data.limitInfo.operationCode,
        disabled: true
      }, [Validators.required]],
      transactionLimits: this.fb.array([])
    })
    const limitsArray = this.data.limitInfo.limits
    if (limitsArray) {
      limitsArray.forEach((item: any) => {
        const limit = this.fb.group({
          periodType: item.periodType,
          amountLimit: [{
            value: item.amountLimit ? item.amountLimit / 100 : null,
            disabled: item.unlimitedAmount
          }],
          unlimitedAmount: item.unlimitedAmount,
          countLimit: [{
            value: item.countLimit ? item.countLimit : null,
            disabled: item.unlimitedCount
          }],
          unlimitedCount: item.unlimitedCount
        })
        this.limits.push(limit)
      })
    }
  }

  get limits() {
    return this.limitEditForm.get('transactionLimits') as FormArray
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

  ngOnInit(): void {
  }

  createLimit() {
    if (this.limitEditForm.valid) {
      let limitsArray: any[] = []
      const limits = this.limitEditForm.value.transactionLimits
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
        limitId: this.data.limitInfo.id,
        transactionLimits: limitsArray
      }
      this.userService.vipUserTransactionLimitUpdate(reqObj).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен!')
          this.onEditLimit.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
