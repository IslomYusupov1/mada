import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepositService} from "../../../../ad-services/deposit.service";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-application-review-description-dialog',
  templateUrl: './application-review-description-dialog.component.html',
  styleUrls: ['./application-review-description-dialog.component.scss']
})
export class ApplicationReviewDescriptionDialogComponent implements OnInit {
  @Output() onChangeStatus: EventEmitter<any> = new EventEmitter<any>()

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required),
    id: new FormControl(null, Validators.required)
  })

  constructor(
    private depositService: DepositService,
    private hrService: HrService,
    private dialogRef: MatDialogRef<ApplicationReviewDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      changeTo: string
    }
  ) {
    this.commentForm.patchValue({
      id: this.data.id
    })
  }

  ngOnInit(): void {
  }

  changeStatus(): void {
    if (this.commentForm.valid) {
      if (this.data.changeTo === 'cancel') {
        this.depositService.applicationReviewCancel(this.commentForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, res.message)
            this.onChangeStatus.emit()
          }
        })
      } else if (this.data.changeTo === 'confirm') {
        this.depositService.applicationReviewConfirm(this.commentForm.value).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, res.message)
            this.onChangeStatus.emit()
          }
        })
      }
    }
  }

  close(): void {
    this.dialogRef.close()
  }
}
