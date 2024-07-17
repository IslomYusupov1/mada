import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../ad-services/user.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-fail-call-hard-dialog',
  templateUrl: './fail-call-hard-dialog.component.html',
  styleUrls: ['./fail-call-hard-dialog.component.scss']
})
export class FailCallHardDialogComponent implements OnInit {
  @Output() fail = new EventEmitter<void>()
  callHardForm: FormGroup = new FormGroup({
    transID: new FormControl(this.data.id),
    comment: new FormControl('',[Validators.required])
  })

  constructor(
    private userService: UserService,
    private hr: HrService,
    private dialogRef: MatDialogRef<FailCallHardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close()
  }

  apply() {
    if (this.callHardForm.valid) {
      this.userService.callFailHard(this.callHardForm.value).then((res) => {
        if (res) {
          if (res.status) {
            this.hr.showMessage(true, 'Успешно')
          }
          else {
            this.hr.showMessage(false, 'Ошибка')
          }
          this.fail.emit()
        }
      })
    }
  }
}
