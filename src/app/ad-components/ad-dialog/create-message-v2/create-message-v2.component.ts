import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PointService} from "../../../ad-services/point.service";

@Component({
  selector: 'app-create-message-v2',
  templateUrl: './create-message-v2.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class CreateMessageV2Component implements OnInit {
  createMessage: FormGroup = new FormGroup({
    key: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    messageUz: new FormControl('', Validators.required),
    messageRu: new FormControl('', Validators.required),
    messageEng: new FormControl('', Validators.required),
    messageKaa: new FormControl('', Validators.required),
  })

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateMessageV2Component>,
    private pointService: PointService
  ) { }

  ngOnInit(): void {
  }

  createMessageV2() {

  }

  close() {
    this.dialogRef.close()
  }
}
