import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-virtual-card-details',
  templateUrl: './virtual-card-details.component.html',
  styleUrls: ['./virtual-card-details.component.scss']
})
export class VirtualCardDetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: {item: any}
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
