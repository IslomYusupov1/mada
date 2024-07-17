import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-government-service-create',
  templateUrl: './government-service-create.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentServiceCreateComponent implements OnInit {
  @Output() onCreateService: EventEmitter<any> = new EventEmitter<any>()
  public loading: boolean = false

  createServiceForm: FormGroup = this.fb.group({
    parent: ['', Validators.required],
    defaultName: ['', Validators.required],
    type: ['', Validators.required],
    requestName: ['', Validators.required],
    show: [false, Validators.required],
    myId: [false, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GovernmentServiceCreateComponent>,
    private govService: GovernmentService,
    private hrSerice: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      serviceTypes: Array<any>,
      parent: string
    }
  ) {
    this.createServiceForm.patchValue({
      parent: this.data.parent
    })
  }

  ngOnInit(): void {
  }

  createService() {
    if (this.createServiceForm.valid) {
      this.govService.stateServiceCreate(this.createServiceForm.value).then((res: any) => {
        if (res) {
          this.hrSerice.showMessage(true,'Успешно добавлен!')
          this.onCreateService.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
