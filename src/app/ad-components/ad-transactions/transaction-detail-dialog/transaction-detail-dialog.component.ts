import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-detail-dialog',
  templateUrl: './transaction-detail-dialog.component.html',
  styleUrls: ['./transaction-detail-dialog.component.scss']
})
export class TransactionDetailDialogComponent implements OnInit {
  info: any = {}
  isCopy: boolean = false

  constructor(
    private dialogRef: MatDialogRef<TransactionDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transactionInfo: any }
  ) {
  }

  ngOnInit(): void {
    this.info = this.data.transactionInfo
  }

  copyText() {
    this.isCopy = true
    setTimeout(() => {
      this.isCopy = false
    }, 1500)
  }

  close() {
    this.dialogRef.close()
  }

}
