import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BannerService} from "../../../../ad-services/settings/banner.service";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-market-settings-edit',
  templateUrl: './market-settings-edit.component.html',
  styleUrls: ['./market-settings-edit.component.scss']
})
export class MarketSettingsEditComponent implements OnInit {
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()

  marketSettingForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private hrService: HrService,
    private dialogRef: MatDialogRef<MarketSettingsEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      info: any
    }
  ) {
    if (this.data.info) {
      const item = this.data.info
      this.marketSettingForm = this.fb.group({
        android: [item.android],
        ios: [item.ios],
        web: [item.web],
        ussd: [item.ussd],
        unknown: [item.unknown],
        typeEnum: [item.typeEnum, Validators.required],
      })
    }
  }

  ngOnInit(): void {
    console.log(this.marketSettingForm.value)
  }

  marketSettingsUpdate(): void {
    this.bannerService.marketplaceOnEdit(this.marketSettingForm.value).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Успешно обновлен!')
        this.onEdit.emit()
      }
    })
  }

  close(): void {
    this.dialogRef.close()
  }
}
