import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FraudService} from "../../../ad-services/fraud.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-edit-create-fraud-dialog',
  templateUrl: './edit-create-fraud-dialog.component.html',
  styleUrls: ['./edit-create-fraud-dialog.component.scss']
})
export class EditCreateFraudDialogComponent implements OnInit {
  createModule: boolean = false
  editModule: boolean = false
  @Output() onEditCreateFraud = new EventEmitter<string>();
  createFraudForm: FormGroup = new FormGroup({
    fraudLimitType: new FormControl(''),
    tryLimit: new FormControl(''),
    blockTime: new FormControl(''),
    isForever: new FormControl(false),
  })
  editFraudForm: FormGroup = new FormGroup({
    tryLimit: new FormControl(this.data.tryLimit),
    blockTime: new FormControl(this.data.blockTime),
    isForever: new FormControl(this.data.isForever || false),
    id: new FormControl(this.data.id),
  })

  constructor(
    private dialogCreate: MatDialogRef<EditCreateFraudDialogComponent>,
    private fraudService: FraudService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      limitType: string
      tryLimit: string
      blockTime: string
      isForever: string
      isEditModule:string
      id:string
      responseLimitType:Array<any>
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.isEditModule ==='edit'){
      this.editModule = true
      this.createModule = false
    }
    else {
      this.createModule = true
      this.editModule = false
    }
    console.log(this.data.responseLimitType)
  }

  closeDialog() {
    this.dialogCreate.close()
  }

  formSubmit(type:string) {
    if (this.createFraudForm.valid) {
      if (type === 'create'){
        this.fraudService.addFraud(this.createFraudForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, 'Успешно добавлено')
            this.onEditCreateFraud.emit()
          }
        })
      }
      else {
        this.fraudService.editFraud(this.editFraudForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, 'Успешно редактирован')
            this.onEditCreateFraud.emit()
          }
        })
      }
    }
  }
}
