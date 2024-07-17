import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-ordered-card-details',
  templateUrl: './ordered-card-details.component.html',
  styles: [`
    .ordered-card {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        border-bottom: 1px solid #ababab;

        span:first-child {
          font-size: 14px;
          color: #191C1A;
          font-weight: 400;
        }

        span:last-child {
          font-size: 16px;
          color: #3F6D5B;
          font-weight: 500;
        }
      }
    }
  `]
})
export class OrderedCardDetailsComponent implements OnInit {

  constructor(
    public hrService: HrService,
    private dialogRef: MatDialogRef<OrderedCardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {info: any}
  ) { }

  ngOnInit(): void {
    console.log(this.data.info)
  }

  close() {
    this.dialogRef.close()
  }
}
