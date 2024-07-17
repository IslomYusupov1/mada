import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-government-service-info-create',
  templateUrl: './government-service-info-create.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentServiceInfoCreateComponent implements OnInit {
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>()
  public langList: Array<string> = ['UZB', 'RUS', 'ENG', 'KAA', 'KRL']

  serviceInfoForm: FormGroup = this.fb.group({
    serviceId: ['', Validators.required],
    organizationPhone: ['', Validators.required],
    infoList: this.fb.array([])
  })

  constructor(
    private hrService: HrService,
    private govService: GovernmentService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GovernmentServiceInfoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceId: string
    }
  ) {
    this.serviceInfoForm.patchValue({
      serviceId: this.data.serviceId
    })
    this.langList.forEach(item => {
      this.formInfoList.push(this.fb.group({
        lang: [item, Validators.required],
        organizationName: ['', Validators.required],
        servicePrice: ['', Validators.required],
        serviceUserType: ['', Validators.required],
        serviceTerm: ['', Validators.required],
      }))
    })
  }

  get formInfoList(): FormArray {
    return this.serviceInfoForm.get('infoList') as FormArray
  }

  ngOnInit(): void {

  }

  public serviceInfoCreate(): void {
    if (this.serviceInfoForm.valid) {
      this.govService.stateServiceInfoCreate(this.serviceInfoForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно добавлен!')
          this.onCreate.emit()
        }
      })
    }
  }

  public close() {
    this.dialogRef.close()
  }
}
