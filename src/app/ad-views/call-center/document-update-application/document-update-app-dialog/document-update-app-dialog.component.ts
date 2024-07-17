import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-document-update-app-dialog',
  templateUrl: './document-update-app-dialog.component.html',
  styles: [
  ]
})
export class DocumentUpdateAppDialogComponent implements OnInit {
  info: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {info: any},
    private dialogRef: MatDialogRef<DocumentUpdateAppDialogComponent>
  ) { }

  ngOnInit(): void {
    this.info = this.data.info
  }

  close():void {
    this.dialogRef.close()
  }
}
