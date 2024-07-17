import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-government-service-edit',
  templateUrl: './government-service-edit.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentServiceEditComponent implements OnInit {
  @Output() onEditService: EventEmitter<any> = new EventEmitter<any>()
  serviceEditForm!: FormGroup

  constructor(
    private dialogRef: MatDialogRef<GovernmentServiceEditComponent>,
    private govService: GovernmentService,
    private hrService: HrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceId: string,
      serviceDefaultName: string,
      categoryDefaultName: string,
      type: string,
      requestName: string,
      technicalWorks: boolean,
      show: boolean,
      myId: boolean,
      serviceTypeList: Array<any>
    }
  ) {
    this.serviceEditForm = this.fb.group({
      serviceId: [this.data.serviceId, Validators.required],
      serviceDefaultName: [this.data.serviceDefaultName, Validators.required],
      categoryDefaultName: [this.data.categoryDefaultName, Validators.required],
      type: [this.data.type, Validators.required],
      requestName: [this.data.requestName, Validators.required],
      technicalWorks: this.data.technicalWorks,
      show: this.data.show,
      myId: this.data.myId,
    })
  }

  ngOnInit(): void {
  }

  editService() {
    if (this.serviceEditForm.valid) {
      this.govService.stateServiceEdit(this.serviceEditForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,'Успешно обновлен!')
          this.onEditService.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
