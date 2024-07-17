import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-aml-user-one',
  templateUrl: './aml-user-one.component.html',
  styleUrls: ['./aml-user-one.component.scss']
})
export class AmlUserOneComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AmlUserOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {info: any}
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
