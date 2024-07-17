import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoanService} from "../../../../ad-services/loan.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-transaction-loan-tool-cause',
  templateUrl: './transaction-loan-tool-cause.component.html',
  styles: [
  ]
})
export class TransactionLoanToolCauseComponent implements OnInit {
  @Output() onPrepare: EventEmitter<any> = new EventEmitter<any>()

  prepareForm: FormGroup = new FormGroup({
    cause: new FormControl('', [Validators.required])
  })

  constructor(
    private dialogRef: MatDialogRef<TransactionLoanToolCauseComponent>,
    private loanService: LoanService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.prepareForm.invalid) {
      return
    }

    this.loanService.paymentToolPrepareTransaction({
      id: this.data.id,
      cause: this.prepareForm.value.cause
    }).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.onPrepare.emit()
      }
    })
  }

  close(): void {
    this.dialogRef.close()
  }
}
