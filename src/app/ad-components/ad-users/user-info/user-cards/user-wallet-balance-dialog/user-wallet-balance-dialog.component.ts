import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-wallet-balance-dialog',
  templateUrl: './user-wallet-balance-dialog.component.html',
  styleUrls: ['./user-wallet-balance-dialog.component.scss']
})
export class UserWalletBalanceDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserWalletBalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      ident: string,
      balance: any
    }
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
}
