import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-ordered-card-update-reason',
  templateUrl: './ordered-card-update-reason.component.html',
  styleUrls: ['./ordered-card-update-reason.component.scss']
})
export class OrderedCardUpdateReasonComponent implements OnInit {

  constructor(
    public hrService: HrService,
    private dialogRef: MatDialogRef<OrderedCardUpdateReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {logs: Array<any>}
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
}
