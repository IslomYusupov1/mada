import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-message-details-v2',
  templateUrl: './message-details-v2.component.html',
  styles: [`
    .details-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eeeeee;
        padding: 4px;
        gap: 4px;

        span:first-child {
          color: #191C1A;
          font-weight: 500;
        }

        span:last-child {
          color: #3F6D5B;
          font-weight: 400;
          text-align: center;
        }
      }
    }
  `]
})
export class MessageDetailsV2Component implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageDetailsV2Component>,
    @Inject(MAT_DIALOG_DATA) public data: {
      details: any
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.details)
  }

  close() {
    this.dialogRef.close()
  }
}
