import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";

@Component({
  selector: 'app-government-title-dialog',
  templateUrl: './government-title-dialog.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovernmentTitleDialogComponent implements OnInit {
  @Output() onTranslateTitle: EventEmitter<any> = new EventEmitter<any>()

  public titleTranslationForm: FormGroup = new FormGroup({
    RUS: new FormControl('', Validators.required),
    UZB: new FormControl('', Validators.required),
    ENG: new FormControl('', Validators.required),
    KAA: new FormControl('', Validators.required),
    KRL: new FormControl('', Validators.required),
  })

  public fullTitleTranslationForm: FormGroup = this.fb.group({
    RUS: ['', Validators.required],
    UZB: ['', Validators.required],
    ENG: ['', Validators.required],
    KAA: ['', Validators.required],
    KRL: ['', Validators.required]
  })

  constructor(
    private dialogRef: MatDialogRef<GovernmentTitleDialogComponent>,
    private dialog: MatDialog,
    private govService: GovernmentService,
    private fb: FormBuilder,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: { translates: any, id: string, type: string, fullTitleTranslates: any }
  ) {
  }

  ngOnInit(): void {
    this.titleTranslationForm.patchValue({
      RUS: this.data.translates.RUS ? this.data.translates.RUS : '',
      UZB: this.data.translates.UZB ? this.data.translates.UZB : '',
      ENG: this.data.translates.ENG ? this.data.translates.ENG : '',
      KAA: this.data.translates.KAA ? this.data.translates.KAA : '',
      KRL: this.data.translates.KRL ? this.data.translates.KRL : ''
    })
    if (this.data.type === 'SERVICE') {
      this.fullTitleTranslationForm.patchValue({
        RUS: this.data.fullTitleTranslates.RUS ? this.data.fullTitleTranslates.RUS : '',
        UZB: this.data.fullTitleTranslates.UZB ? this.data.fullTitleTranslates.UZB : '',
        ENG: this.data.fullTitleTranslates.ENG ? this.data.fullTitleTranslates.ENG : '',
        KAA: this.data.fullTitleTranslates.KAA ? this.data.fullTitleTranslates.KAA : '',
        KRL: this.data.fullTitleTranslates.KRL ? this.data.fullTitleTranslates.KRL : ''
      })
    }
  }

  saveTranslate() {
    if (this.titleTranslationForm.valid) {
      if (this.data.type === 'CATEGORY') {
        this.govService.stateCategoryTranslate({
          titleTranslate: this.titleTranslationForm.value,
          categoryId: this.data.id
        }).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, 'Название успешно сохранено!')
            this.onTranslateTitle.emit()
          }
        })
      } else if (this.data.type === 'SERVICE') {
        if (this.fullTitleTranslationForm.valid) {
          this.govService.stateServiceTranslate({
            serviceShortTitleTranslate: this.titleTranslationForm.value,
            serviceFullTitleTranslate: this.fullTitleTranslationForm.value,
            id: this.data.id
          }).then((res: any) => {
            if (res) {
              this.hrService.showMessage(true, 'Название успешно сохранено!')
              this.onTranslateTitle.emit()
            }
          })
        } else {
          this.hrService.showMessage(false, 'Заполните все поле!')
        }
      }
    }
  }

  close() {
    this.dialogRef.close()
  }

}
