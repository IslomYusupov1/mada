import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-product-loan-app-one',
  templateUrl: './product-loan-app-one.component.html',
  styleUrls: ['./product-loan-app-one.component.scss']
})
export class ProductLoanAppOneComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ProductLoanAppOneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {info: any}
  ) { }

  ngOnInit(): void {
    console.log(this.data.info)
  }

  close(): void {
    this.dialogRef.close()
  }
}
