import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-folder-error-message',
  templateUrl: './loan-folder-error-message.component.html',
  styles: [
  ]
})
export class LoanFolderErrorMessageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoanFolderErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text: string}
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close()
  }
}
