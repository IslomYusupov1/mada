import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GovernmentService} from "../../../../ad-services/payment/government.service";

@Component({
  selector: 'app-government-req-param-edit',
  templateUrl: './government-req-param-edit.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentReqParamEditComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()

  reqEditForm: FormGroup = this.fb.group({
    requestParamId: ['', Validators.required],
    mask: null,
    title: ['', Validators.required],
    type: ['', Validators.required],
    prefix: null,
    suffix: null,
    value: null,
    keyName: null,
    required: [false, Validators.required],
    readOnly: [false, Validators.required],
    canValue: [false, Validators.required],
    canValidate: [false, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private hrService: HrService,
    private dialogRef: MatDialogRef<GovernmentReqParamEditComponent>,
    private govService: GovernmentService,
    @Inject(MAT_DIALOG_DATA) public data: {
      reqParamInfo: any,
      typeList: Array<string>
    }
  ) {
    console.log(this.data)
  }

  ngOnInit(): void {
    const info = this.data.reqParamInfo
    this.reqEditForm.patchValue({
      requestParamId: info.uuid,
      mask: info.mask,
      title: info.title,
      type: info.type,
      prefix: info.prefix,
      suffix: info.suffix,
      value: info.value,
      keyName: info.keyName,
      required: info.required,
      readOnly: info.readOnly,
      canValue: info.canValue,
      canValidate: info.canValidate,
    })
  }

  editReqParam(): void {
    if (this.reqEditForm.valid) {
      this.govService.stateReqParamEdit(this.reqEditForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен!')
          this.onEdit.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
