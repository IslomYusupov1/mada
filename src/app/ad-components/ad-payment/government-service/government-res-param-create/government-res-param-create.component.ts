import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-government-res-param-create',
  templateUrl: './government-res-param-create.component.html',
  styleUrls: ['./government-res-param-create.component.scss']
})
export class GovernmentResParamCreateComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>()
  public createForm: FormGroup = this.fb.group({
    serviceId: ['', Validators.required],
    keyName: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
  })

  constructor(
    private dialogRef: MatDialogRef<GovernmentResParamCreateComponent>,
    private hrService: HrService,
    private govService: GovernmentService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      typeList: Array<string>,
      serviceId: string
    }
  ) { }

  ngOnInit(): void {
    this.createForm.patchValue({
      serviceId: this.data.serviceId
    })
  }

  createResParam() {
    if (this.createForm.valid) {
      this.govService.stateResParamCreate(this.createForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно добавлен!')
          this.onCreate.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
