import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-loan-schedule',
  templateUrl: './user-loan-schedule.component.html',
  styles: [`
    .table {
      &-header {
        border-bottom: 1px solid #3f6d5b;

        th {
          font-size: 13px;
          font-weight: 400;
          line-height: 16px;
          color: #3f6d5b;
        }
      }

      &-body {
        td {
          font-size: 13px;
          font-weight: 400 !important;
          line-height: 16px;
        }
      }
    }`
  ]
})
export class UserLoanScheduleComponent implements OnInit {
  loading: boolean = false
  dataList: Array<any> = []

  constructor(
    private dialogRef: MatDialogRef<UserLoanScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      list: Array<any>
    }
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

}
