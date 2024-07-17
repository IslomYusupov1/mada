import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PaynetService} from "../../../../ad-services/paynet.service";
import {AdStatusDialogComponent} from "../../../../ad-components/ad-status-dialog/ad-status-dialog.component";

@Component({
  selector: 'app-paynet-category-create',
  templateUrl: './paynet-category-create.component.html',
  styleUrls: ['./paynet-category-create.component.scss']
})
export class PaynetCategoryCreateComponent implements OnInit {
  @Output() onCreateCategory = new EventEmitter<string>()
  parent: any;

  categoryCreateForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    forMyHome: new FormControl(false),
    autoPay: new FormControl(false)
  })

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaynetService,
    private dialogRef: MatDialogRef<PaynetCategoryCreateComponent>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      if (q.id) {
        this.parent = q.id
      } else {
        this.parent = null
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  createCategory() {
    if (this.categoryCreateForm.valid) {
      this.paymentService.categoryCreate({
        title: this.categoryCreateForm.value.title,
        parent: this.parent,
        forMyHome: this.categoryCreateForm.value.forMyHome,
        autoPay: this.categoryCreateForm.value.autoPay
      }).then((res: any) => {
        if (res) {
          this.showMessage(true, 'Категория успешно создана')
          this.onCreateCategory.emit()
        }
      })
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }
}
