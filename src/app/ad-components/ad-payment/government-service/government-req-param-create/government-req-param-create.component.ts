import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";

@Component({
  selector: 'app-government-req-param-create',
  templateUrl: './government-req-param-create.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentReqParamCreateComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>()

  reqCreateForm: FormGroup = this.fb.group({
    serviceId: ['', Validators.required],
    mask: null,
    title: ['', Validators.required],
    type: ['', Validators.required],
    prefix: null,
    suffix: null,
    value: null,
    parent: null,
    keyName: null,
    required: [false, Validators.required],
    readOnly: [false, Validators.required],
    canValue: [false, Validators.required],
    canValidate: [false, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private hrService: HrService,
    private dialogRef: MatDialogRef<GovernmentReqParamCreateComponent>,
    private govService: GovernmentService,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceId: string,
      typeList: Array<string>,
      parent: string | null
    }
  ) {
    this.reqCreateForm.patchValue({
      serviceId: this.data.serviceId,
      parent: this.data.parent
    })
  }

  ngOnInit(): void {
  }

  createReqParam(): void {
    if (this.reqCreateForm.valid) {
      this.govService.stateReqParamCreate(this.reqCreateForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,'Успешно добавлен!')
          this.onCreate.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
