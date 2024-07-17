import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../../ad-services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  @Output() onChangePassword: EventEmitter<any> = new EventEmitter<any>()
  passShow: boolean = false
  step: number = 0
  message: string = ''
  identity: string = ''
  pubKey: string = ''

  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
  }, this.passwordMatch('password', 'confirmPassword'))

  confirmForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.compose([Validators.required]))
  })

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private hrService: HrService
  ) {
    if (this.getPubKey) {
      this.pubKey = this.getPubKey
    } else {
      this.dialogRef.close()
    }
  }

  ngOnInit(): void {
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  get confirmPasswordControl() {
    return this.changePasswordForm.get('confirmPassword')
  }

  passwordInit(): void {
    if (this.changePasswordForm.valid) {
      this.userService.adminPasswordChangeInit({
        passwordOld: this.hrService.encWithPubKey(String(this.changePasswordForm.value.oldPassword), this.pubKey),
        passwordNew: this.hrService.encWithPubKey(String(this.changePasswordForm.value.password), this.pubKey)
      }).then((res: any) => {
        if (res) {
          this.message = res.message
          this.identity = res.identity
          this.step++
        }
      })
    }
  }

  passwordChangeConfirm(): void {
    if (this.confirmForm.valid) {
      this.userService.adminPasswordChangeConfirm({
        identity: this.identity,
        code: this.confirmForm.value.code
      }).then((res: any) => {
        if (res) {
          this.hrService.showMessage(true, res.message ? res.message : 'Пароль успешно изменен!')
          this.onChangePassword.emit()
        }
      })
    }
  }

  back(): void {
    this.message = ''
    this.identity = ''
    this.step--
  }

  close(): void {
    this.dialogRef.close()
  }

  get getPubKey(): string {
    let pKey = localStorage.getItem('pk')
    return pKey || ''
  }
}
