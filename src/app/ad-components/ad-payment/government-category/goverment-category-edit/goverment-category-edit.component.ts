import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";

@Component({
  selector: 'app-goverment-category-edit',
  templateUrl: './goverment-category-edit.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovermentCategoryEditComponent implements OnInit {
  @Output() onCreateCategory: EventEmitter<any> = new EventEmitter<any>()
  categoryCreateForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GovermentCategoryEditComponent>,
    private hrService: HrService,
    private govService: GovernmentService,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, categoryId: string}
  ) {
    this.categoryCreateForm = this.fb.group({
      title: [data.title, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  editCategory() {
    if (this.categoryCreateForm.valid && this.data.categoryId) {
      this.govService.stateCategoryEdit({
        title: this.categoryCreateForm.value.title,
        categoryId: this.data.categoryId
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, 'Успешно обновлен!')
          this.onCreateCategory.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
