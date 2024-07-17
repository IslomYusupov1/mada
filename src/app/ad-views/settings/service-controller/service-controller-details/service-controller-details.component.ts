import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-service-controller-details',
  templateUrl: './service-controller-details.component.html',
  styleUrls: ['./service-controller-details.component.scss']
})
export class ServiceControllerDetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ServiceControllerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      info: any
    }
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void{
    this.dialogRef.close()
  }
}
