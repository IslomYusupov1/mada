import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-car-color-edit-dialog',
  templateUrl: './car-color-edit-dialog.component.html',
  styleUrls: ['./car-color-edit-dialog.component.scss']
})
export class CarColorEditDialogComponent implements OnInit {
  @Output() onCreateColor: EventEmitter<any> = new EventEmitter<any>()
  createForm: FormGroup = this.fb.group({
    colorId: ['', Validators.required],
    colorName: ['', Validators.required],
    colorPalette: ['#000000', Validators.required],
    colorCode: ['000000', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  }, {
    updateOn: 'blur'
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarColorEditDialogComponent>,
    private myAutoService: MyAutoService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      item: any
    }
  ) {
  }

  ngOnInit(): void {
    if (this.data.item) {
      this.createForm.patchValue({
        colorId: this.data.item.id,
        colorPalette: this.data.item.colorCode ? this.data.item.colorCode : '#000000',
        colorName: this.data.item.colorName ? this.data.item.colorName : '',
        colorCode: this.data.item.colorCode ? this.data.item.colorCode.substr(1,6) : '000000'
      })
    }
    console.log(this.data.item)
  }

  changeColorInput(event: any): void {
    if (event.target.value.length === 7) {
      this.createForm.patchValue({
        colorPalette: event.target.value
      })
    }
  }

  patchColorCodeInput(event: any) {
    this.createForm.patchValue({
      colorCode: event.target.value.substr(1, 6)
    })
  }

  createColor(): void {
    if (this.createForm.valid) {
      this.myAutoService.colorEdit({
        colorId: this.createForm.value.colorId,
        colorName: this.createForm.value.colorName,
        colorCode: this.createForm.value.colorPalette
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно обновлен!')
          this.onCreateColor.emit()
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close()
  }
}
