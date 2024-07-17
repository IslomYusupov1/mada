import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-schedule-quee-dialog',
  templateUrl: './schedule-quee-dialog.component.html',
  styles: [
  ]
})
export class ScheduleQueeDialogComponent implements OnInit {
@Output() queue  = new EventEmitter<void>()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {queue: Array<{userUuid:string,fullname:string,phone:string,lang:string,deviceType:string}>},
    private dialogRef: MatDialogRef<ScheduleQueeDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  closeDialog(){
  this.dialogRef.close()
  }

}
