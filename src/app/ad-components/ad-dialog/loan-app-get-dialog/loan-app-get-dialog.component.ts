import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../ad-agree-dialog/ad-agree-dialog.component";
import {LoanService} from "../../../ad-services/loan.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-loan-app-get-dialog',
  templateUrl: './loan-app-get-dialog.component.html',
  styleUrls: ['./loan-app-get-dialog.component.scss']
})
export class LoanAppGetDialogComponent implements OnInit {
  @Output() onRefresh: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    public dialogLoan: MatDialogRef<LoanAppGetDialogComponent>,
    private dialog: MatDialog,
    private loanService: LoanService,
    private hr: HrService,
    @Inject(MAT_DIALOG_DATA) public data: { items: any, loanId: number }
  ) {
  }

  ngOnInit(): void {
  }

  getItem() {
    this.loanService.getOneLoanApp(this.data.loanId).then((res: any) => {
      if (res) {
        this.data.items = res.items
      }
    })
  }

  fixLoanStatus(state: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите принудительный выпуск?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.forceIssue(state, this.data.loanId)
    })
  }

  forceIssue(status: string, id: number) {
    this.loanService.issueForceLoan(status, id).then((res: any) => {
      if (res) {
        this.hr.showMessage(true, res.message)
        this.getItem()
      }
    })

  }

  refreshList(): void {
    this.onRefresh.emit()
  }
}
