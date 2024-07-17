import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-portfel-admin-statistics',
  templateUrl: './loan-portfel-admin-statistics.component.html',
  styleUrls: ['./loan-portfel-admin-statistics.component.scss']
})
export class LoanPortfelAdminStatisticsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoanPortfelAdminStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {list: Array<any>}
  ) {
    console.log(this.data.list)
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
