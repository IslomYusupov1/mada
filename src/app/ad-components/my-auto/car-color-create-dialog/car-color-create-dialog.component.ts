import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-car-color-create-dialog',
  templateUrl: './car-color-create-dialog.component.html',
  styleUrls: ['./car-color-create-dialog.component.scss']
})
export class CarColorCreateDialogComponent implements OnInit {
  @Output() onCreateColor: EventEmitter<any> = new EventEmitter<any>()
  createForm: FormGroup = this.fb.group({
    colorName: ['', Validators.required],
    colorPalette: ['#000000', Validators.required],
    colorCode: ['000000', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  }, {
    updateOn: 'blur'
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarColorCreateDialogComponent>,
    private myAutoService: MyAutoService,
    private hrService: HrService
  ) {
  }

  ngOnInit(): void {
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
      this.myAutoService.colorAdd({
        colorName: this.createForm.value.colorName,
        colorCode: this.createForm.value.colorPalette
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,res.message ? res.message : 'Успешно добавлен')
          this.onCreateColor.emit()
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close()
  }


}
