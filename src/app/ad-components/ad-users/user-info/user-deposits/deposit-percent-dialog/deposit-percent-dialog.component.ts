import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../ad-services/user.service";
import {HrService} from "../../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-deposit-percent-dialog',
  templateUrl: './deposit-percent-dialog.component.html',
  styles: [
  ]
})
export class DepositPercentDialogComponent implements OnInit {
  isWallet: boolean = false
  @Output() onWithdrawalPercent: EventEmitter<any> = new EventEmitter<any>()

  percentForm: FormGroup = this.fb.group({
    percentAmount: [null, Validators.required]
  })

  constructor(
    private dialogRef: MatDialogRef<DepositPercentDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      percentAmount: number,
      uuid: string
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.percentForm.patchValue({
      percentAmount: this.data.percentAmount / 100
    })
    this.percentForm.controls['percentAmount'].setValidators(Validators.max(this.data.percentAmount / 100))
  }

  close() {
    this.dialogRef.close()
  }

  withdrawalOfInterest() {
    if (this.data.uuid && this.percentForm.valid) {
      this.userService.depositPercentWallet({
        amount: this.percentForm.value.percentAmount * 100,
        depId: this.data.uuid
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.onWithdrawalPercent.emit()
        }
      })
    }
  }
}
