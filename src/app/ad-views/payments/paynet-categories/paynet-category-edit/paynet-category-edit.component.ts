import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-category-edit',
  templateUrl: './paynet-category-edit.component.html',
  styleUrls: ['./paynet-category-edit.component.scss']
})
export class PaynetCategoryEditComponent implements OnInit {
  @Output() onEditCategory = new EventEmitter<string>()

  categoryEditForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    forMyHome: new FormControl(false),
    autoPay: new FormControl(false)
  })

  constructor(
    private paymentService: PaynetService,
    private dialogRef: MatDialogRef<PaynetCategoryEditComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      uuid: string,
      title: string,
      forMyHome: boolean,
      autoPay: boolean
    }
  ) { }

  ngOnInit(): void {
    this.categoryEditForm.patchValue({
      title: this.data.title,
      forMyHome: this.data.forMyHome,
      autoPay: this.data.autoPay
    })
  }

  editCategory() {
    if (this.categoryEditForm.valid && this.data.uuid) {
      this.paymentService.categoryEdit({
        paymentCategoryId: this.data.uuid,
        title: this.categoryEditForm.value.title,
        forMyHome: this.categoryEditForm.value.forMyHome,
        autoPay: this.categoryEditForm.value.autoPay
      }).then((res: any) => {
        if (res) {
          this.showMessage(true,'Категория успешно изменена')
          this.onEditCategory.emit()
        }
      })
    }
  }

  close() {
    this.dialogRef.close()
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
