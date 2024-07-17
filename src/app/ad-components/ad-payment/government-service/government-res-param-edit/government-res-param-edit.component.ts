import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";

@Component({
  selector: 'app-government-res-param-edit',
  templateUrl: './government-res-param-edit.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentResParamEditComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()
  public editForm: FormGroup = this.fb.group({
    responseParamId: ['', Validators.required],
    keyName: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
  })

  constructor(
    private dialogRef: MatDialogRef<GovernmentResParamEditComponent>,
    private hrService: HrService,
    private govService: GovernmentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      typeList: Array<string>,
      responseParamId: string,
      title: string,
      keyName: string,
      type: string
    }
  ) {
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      responseParamId: this.data.responseParamId,
      keyName: this.data.keyName,
      title: this.data.title,
      type: this.data.type
    })
  }

  editResParam() {
    if (this.editForm.valid) {
      this.govService.stateResParamEdit(this.editForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно добавлен!')
          this.onEdit.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
