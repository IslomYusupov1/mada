import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-loan-statistics-item',
  templateUrl: './loan-statistics-item.component.html',
  styles: [`
    .host {
      width: 400px;
      max-width: 400px;
    }
  `]
})
export class LoanStatisticsItemComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LoanStatisticsItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: any
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  close(): void {
    this.dialogRef.close()
  }
}
