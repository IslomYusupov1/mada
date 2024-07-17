import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-folder-info-dialog',
  templateUrl: './loan-folder-info-dialog.component.html',
  styleUrls: ['./loan-folder-info-dialog.component.scss']
})
export class LoanFolderInfoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoanFolderInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.info)
  }

  close(): void {
    this.dialogRef.close()
  }
}
