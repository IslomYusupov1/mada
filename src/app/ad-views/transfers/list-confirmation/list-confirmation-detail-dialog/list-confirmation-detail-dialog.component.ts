import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-list-confirmation-detail-dialog',
  templateUrl: './list-confirmation-detail-dialog.component.html',
  styles: [
  ]
})
export class ListConfirmationDetailDialogComponent implements OnInit {
  isCopy: boolean = false

  constructor(
    private dialogRef: MatDialogRef<ListConfirmationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item: any}
  ) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  close(): void {
    this.dialogRef.close()
  }

  copyText() {
    this.isCopy = true
    setTimeout(() => {
      this.isCopy = false
    }, 1500)
  }
}
