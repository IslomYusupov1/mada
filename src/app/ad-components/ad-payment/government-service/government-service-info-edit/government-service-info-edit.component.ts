import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-government-service-info-edit',
  templateUrl: './government-service-info-edit.component.html',
  styles: [`
  .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentServiceInfoEditComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>()

  serviceInfoForm: FormGroup = this.fb.group({
    serviceId: ['', Validators.required],
    organizationPhone: ['', Validators.required],
    infoList: this.fb.array([])
  })

  constructor(
    private hrService: HrService,
    private govService: GovernmentService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GovernmentServiceInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceId: string,
      serviceInfos: Array<any>
    }
  ) { }

  ngOnInit(): void {
    this.serviceInfoForm.patchValue({
      serviceId: this.data.serviceId,
      organizationPhone: this.data.serviceInfos[0].organizationPhone
    })
    this.data.serviceInfos.forEach(item => {
      this.formInfoList.push(this.fb.group({
        lang: [item.lang, Validators.required],
        organizationName: [item.organizationName, Validators.required],
        servicePrice: [item.servicePrice, Validators.required],
        serviceUserType: [item.serviceUserType, Validators.required],
        serviceTerm: [item.serviceTerm, Validators.required],
      }))
    })
  }

  get formInfoList(): FormArray {
    return this.serviceInfoForm.get('infoList') as FormArray
  }

  public serviceInfoEdit(): void {
    if (this.serviceInfoForm.valid) {
      this.govService.stateServiceInfoEdit(this.serviceInfoForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен!')
          this.onCreate.emit()
        }
      })
    }
  }

  public close() {
    this.dialogRef.close()
  }
}
