import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-international-transfer-info',
  templateUrl: './international-transfer-info.component.html',
  styleUrls: ['./international-transfer-info.component.scss']
})
export class InternationalTransferInfoComponent implements OnInit {

  constructor(
    public hrService: HrService,
    private dialogRef: MatDialogRef<InternationalTransferInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.info)
  }

  close(): void {
    this.dialogRef.close()
  }
}
