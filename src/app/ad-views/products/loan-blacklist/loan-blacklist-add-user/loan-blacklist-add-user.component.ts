import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoanService} from "../../../../ad-services/loan.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-loan-blacklist-add-user',
  templateUrl: './loan-blacklist-add-user.component.html',
  styleUrls: ['./loan-blacklist-add-user.component.scss']
})
export class LoanBlacklistAddUserComponent implements OnInit {
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>()
  public loanTypeList = ["UZASBO", "SALARY", "OMUC"]
  public formModel: FormGroup = this.fb.group({
    pinfl: ['', Validators.required],
    loanType: [null, Validators.required],
    adminComment: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoanBlacklistAddUserComponent>,
    private loanService: LoanService,
    private hrService: HrService
  ) { }

  ngOnInit(): void {
  }

  public addUserToBlackList(): void {
    if (this.formModel.valid) {
      this.loanService.loanBlackListAdd(this.formModel.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,res.message ? res.message : 'Успешно!')
          this.onAdd.emit()
        }
      })
    }
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
