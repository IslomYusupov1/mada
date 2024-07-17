import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-blacklist-user-details',
  templateUrl: './loan-blacklist-user-details.component.html',
  styleUrls: ['./loan-blacklist-user-details.component.scss']
})
export class LoanBlacklistUserDetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoanBlacklistUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item: any}
  ) { }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close()
  }
}
