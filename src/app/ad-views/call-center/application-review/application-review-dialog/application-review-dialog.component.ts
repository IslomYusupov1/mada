import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-application-review-dialog',
  templateUrl: './application-review-dialog.component.html',
  styleUrls: ['./application-review-dialog.component.scss']
})
export class ApplicationReviewDialogComponent implements OnInit {
  info: any = {}
  constructor(
    private dialogRef: MatDialogRef<ApplicationReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: any }
  ) {
  }

  ngOnInit(): void {
    this.info = this.data.info
    this.info.createdAt = this.info.createdAt ? `${this.info.createdAt.substr(0,10)} ${this.info.createdAt.substr(11,8)}` : '-'
    this.info.updatedAt = this.info.updatedAt ? `${this.info.updatedAt.substr(0,10)} ${this.info.updatedAt.substr(11,8)}` : '-'
    this.info.readTime = this.info.readTime ? `${this.info.readTime.substr(0,10)} ${this.info.readTime.substr(11,8)}` : null
  }

  close(): void {
    this.dialogRef.close()
  }
}
