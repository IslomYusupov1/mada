import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-document-update-app-compare-dialog',
  templateUrl: './document-update-app-compare-dialog.component.html',
  styleUrls: ['./document-update-app-compare-dialog.component.scss']
})
export class DocumentUpdateAppCompareDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DocumentUpdateAppCompareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item: any}
  ) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
