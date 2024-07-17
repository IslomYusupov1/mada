import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {GovernmentService} from "../../../../ad-services/payment/government.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-goverment-category-create',
  templateUrl: './goverment-category-create.component.html',
  styles: [`
    .mat-form-field {
      width: 100%;
    }
  `]
})
export class GovermentCategoryCreateComponent implements OnInit {
  @Output() onCreateCategory: EventEmitter<any> = new EventEmitter<any>()
  parentId!: string | null
  categoryCreateForm: FormGroup = this.fb.group({
    title: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GovermentCategoryCreateComponent>,
    private hrService: HrService,
    private govService: GovernmentService,
    private route: ActivatedRoute
  ) {
    this.parentId = this.route.snapshot.queryParams.id || null
  }

  ngOnInit(): void {

  }

  createCategory() {
    if (this.categoryCreateForm.valid) {
      this.govService.stateCategoryCreate({
        title: this.categoryCreateForm.value.title,
        parent: this.parentId
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true,'Успешно создан!')
          this.onCreateCategory.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }
}
