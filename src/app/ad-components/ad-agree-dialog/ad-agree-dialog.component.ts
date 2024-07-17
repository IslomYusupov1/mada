import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-ad-agree-dialog',
  templateUrl: './ad-agree-dialog.component.html',
  styles: [
  ]
})
export class AdAgreeDialogComponent implements OnInit {

  @Output() onAgree = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<AdAgreeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: '' },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close()
  }

  apply() {
    this.onAgree.emit();
  }
}
