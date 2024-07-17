import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {PointService} from "../../../../ad-services/point.service";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-service-controller-inactive-dialog',
  templateUrl: './service-controller-inactive-dialog.component.html',
  styleUrls: ['./service-controller-inactive-dialog.component.scss']
})
export class ServiceControllerInactiveDialogComponent implements OnInit {
  @Output() onInactive: EventEmitter<any> = new EventEmitter<any>()
  inactiveForm: FormGroup = this.fb.group({
    serviceName: ['', Validators.required],
    reason: ['', Validators.required],
  })

  constructor(
    private pointService: PointService,
    private hrService: HrService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceControllerInactiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { serviceName: string }
  ) {
  }

  ngOnInit(): void {
    if (this.data.serviceName) {
      this.inactiveForm.patchValue({
        serviceName: this.data.serviceName
      })
    } else {
      this.hrService.showMessage(false, 'Неверный сервис')
      this.dialogRef.close()
    }
  }

  inactiveService(): void {
    if (this.inactiveForm.valid) {
      this.pointService.controlServiceInactive(this.inactiveForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.onInactive.emit()
        }
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
