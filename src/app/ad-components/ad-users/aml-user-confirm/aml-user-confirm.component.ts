import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../ad-services/user.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-aml-user-confirm',
  templateUrl: './aml-user-confirm.component.html',
  styleUrls: ['./aml-user-confirm.component.scss']
})
export class AmlUserConfirmComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>()

  confirmForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
    comment: ['', Validators.required]
  })

  constructor(
    private dialogRef: MatDialogRef<AmlUserConfirmComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private hrService: HrService,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number
      fullName: string
    }
  ) {
    console.log(this.data)
  }

  ngOnInit(): void {
    this.confirmForm.patchValue({
      id: this.data.id
    })
  }

  confirmUser(): void {
    if (this.confirmForm.invalid) {
      return
    }

    this.userService.userCheckAmlConfirm(this.confirmForm.value).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.onConfirm.emit()
      }
    })
  }

  closeDialog(): void{
    this.dialogRef.close()
  }
}
