import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-limit-details',
  templateUrl: './limit-details.component.html',
  styleUrls: ['./limit-details.component.scss']
})
export class LimitDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {item: any},
    private dialogRef: MatDialogRef<LimitDetailsComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  close() {
    this.dialogRef.close()
  }

}
