import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transaction-check-hold',
  templateUrl: './transaction-check-hold.component.html',
  styles: []
})
export class TransactionCheckHoldComponent implements OnInit {
  isCopy: boolean = false

  constructor(
    private dialogRef: MatDialogRef<TransactionCheckHoldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any
    }
  ) { }

  ngOnInit(): void {
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
