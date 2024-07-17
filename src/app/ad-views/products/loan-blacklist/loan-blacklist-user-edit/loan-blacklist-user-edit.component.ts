import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoanService} from "../../../../ad-services/loan.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-loan-blacklist-user-edit',
  templateUrl: './loan-blacklist-user-edit.component.html',
  styleUrls: ['./loan-blacklist-user-edit.component.scss']
})
export class LoanBlacklistUserEditComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()
  public loanTypeList = ["UZASBO", "SALARY", "OMUC"]
  public formModel: FormGroup = this.fb.group({
    id: [null, Validators.required],
    loanType: [null, Validators.required],
    adminComment: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoanBlacklistUserEditComponent>,
    private loanService: LoanService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      loanType: Array<string>,
      adminComment: string
    }
  ) {
    this.formModel.setValue(this.data)
    console.log(this.formModel.value)
  }

  ngOnInit(): void {
  }

  public editLoanBlackListUser(): void {
    if (this.formModel.valid) {
      this.loanService.loanBlackListEdit(this.formModel.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.onEdit.emit()
        }
      })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
