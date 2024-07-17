import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-chat-image-dialog',
  templateUrl: './chat-image-dialog.component.html',
  styles: [
  ]
})
export class ChatImageDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ChatImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {path: string}
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

}
