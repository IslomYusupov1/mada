import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MyAutoService} from "../../../ad-services/my-auto.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-car-color-similar-add-dialog',
  templateUrl: './car-color-similar-add-dialog.component.html',
  styles: []
})
export class CarColorSimilarAddDialogComponent implements OnInit {
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>()

  addSimilarForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private myAutoService: MyAutoService,
    private hrService: HrService,
    private dialogRef: MatDialogRef<CarColorSimilarAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, type: string }
    ,) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  addSimilarName(): void {
    if (this.data.type === 'model') {
      this.addModelSimilarName()
    } else if (this.data.type === 'color') {
      this.addColorSimilarName()
    }
  }

  addModelSimilarName(): void {
    if (this.addSimilarForm.valid) {
      let similarList: Array<string> = []
      similarList.push(this.addSimilarForm.value.name)
      this.myAutoService.addModelSimilarName({
        modelId: this.data.id,
        similarNameList: similarList
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.onAdd.emit()
        }
      })
    }
  }

  addColorSimilarName(): void {
    if (this.addSimilarForm.valid) {
      let similarList: Array<string> = []
      similarList.push(this.addSimilarForm.value.name)
      this.myAutoService.addColorSimilarName({
        colorId: this.data.id,
        similarNameList: similarList
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
          this.onAdd.emit()
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close()
  }
}
