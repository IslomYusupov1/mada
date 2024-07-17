import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-log-settings-edit',
  templateUrl: './log-settings-edit.component.html',
  styles: [
  ]
})
export class LogSettingsEditComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()

  logSettingsForm: FormGroup = this.fb.group({
    key: ['', Validators.required],
    value: [false, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private hrService: HrService,
    private dialogRef: MatDialogRef<LogSettingsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {info: {key: string, value: string}}
  ) {
    this.logSettingsForm.setValue(this.data.info)
  }

  ngOnInit(): void {
  }

  logSettingsUpdate(): void {
    if (this.logSettingsForm.valid) {
      this.bannerService.logSettingsEdit(this.logSettingsForm.value).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,'Успешно обновлен!')
          this.onEdit.emit()
        }
      })
    } else {
      return
    }
  }

  close(): void {
    this.dialogRef.close()
  }
}
