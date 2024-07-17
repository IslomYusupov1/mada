import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-government-res-param-translate',
  templateUrl: './government-res-param-translate.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentResParamTranslateComponent implements OnInit {
  @Output() onTranslateTitle = new EventEmitter<string>()

  titleTranslationForm: FormGroup = new FormGroup({
    RUS: new FormControl('', Validators.required),
    UZB: new FormControl('', Validators.required),
    ENG: new FormControl('', Validators.required),
    KAA: new FormControl('', Validators.required),
    KRL: new FormControl('', Validators.required),
  })

  constructor(
    private hrService: HrService,
    private dialogRef: MatDialogRef<GovernmentResParamTranslateComponent>,
    private govService: GovernmentService,
    @Inject(MAT_DIALOG_DATA) public data: {
      uuid: string,
      translates: any
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.translates && Object.keys(this.data.translates).length !== 0) {
      this.titleTranslationForm.patchValue({
        RUS: this.data.translates.RUS,
        UZB: this.data.translates.UZB,
        ENG: this.data.translates.ENG,
        KAA: this.data.translates.KAA,
        KRL: this.data.translates.KRL
      })
    }
  }

  saveTranslate() {
    if (this.titleTranslationForm.valid) {
      this.govService.stateResParamTranslates({
        titleTranslate: this.titleTranslationForm.value,
        responseParamId: this.data.uuid
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Название успешно сохранено!')
          this.onTranslateTitle.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
