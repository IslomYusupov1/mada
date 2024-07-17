import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-card-balance-dialog',
  templateUrl: './user-card-balance-dialog.component.html',
  styleUrls: ['./user-card-balance-dialog.component.scss']
})
export class UserCardBalanceDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserCardBalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      balance: any,
      maskedPan: string
    }
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

}
