import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {AuthService} from "../../../ad-services/auth.service";
import {HrService} from "../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  @ViewChild('confirmCode') confirmCode!: ElementRef
  @ViewChild('passwordInput') passwordInput!: ElementRef
  identity: string = ''
  message: string = ''
  pubKey: string = ''
  phoneNumberForm: boolean = true
  isConfirm: boolean = false
  isLogin: boolean = false
  formPhoneNumber: FormGroup = new FormGroup({
    username: new FormControl('998', Validators.compose([Validators.minLength(12)])),
    // password: new FormControl('', [Validators.minLength(6)])
  }, {updateOn: 'change'})
  formSmsCode: FormGroup = new FormGroup({
    code: new FormControl('', Validators.compose([Validators.minLength(6), Validators.maxLength(6)]))
  })
  loginForm: FormGroup = new FormGroup({
    password: new FormControl('', Validators.compose([Validators.minLength(6)]))
  })
  passShow: boolean = false

  constructor(
    private authService: AuthService,
    public hr: HrService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    if (this.authToken) {
      const data: any = localStorage.getItem('userdata')
      const parse = JSON.parse(data)
      const routerUrl = parse.role.defaultUrl
      if (routerUrl) {
        this.router.navigate([routerUrl]).then(() => {
        })
      } else {
        this.router.navigate(['/dashboard']).then(() => {
        })
      }
    }
  }

  ngOnInit(): void {

  }

  userCheck() {
    if (this.formPhoneNumber.valid) {
      if (this.username && this.username.valid) {
        this.authService.userCheck('+' + this.formPhoneNumber.value.username).subscribe((res: any) => {
          if (res) {
            this.identity = res.data.identity
            this.message = res.data.message
            this.phoneNumberForm = false
            this.isConfirm = true
            setTimeout(()=>{
              this.confirmCode.nativeElement.focus()
            },100)
          }
        }, (error: any) => {
          if (error) {
            this.showMessage(false, error.error.errorMessage ? error.error.errorMessage : 'Ошибка!')
          }
        })
      }
    }
  }

  userVerify() {
    if (this.code && this.code.valid) {
      this.authService.verifyUser({
        identity: this.identity,
        code: this.formSmsCode.value.code
      })
        .subscribe((res: any) => {
          if (res) {
            this.pubKey = res.data.encryptKey
            localStorage.setItem('pk', res.data.encryptKey)
            this.identity = res.data.identity
            this.isConfirm = false
            this.isLogin = true
            setTimeout(()=>{
              this.passwordInput.nativeElement.focus()
            },100)
          }
        }, (error: any) => {
          if (error) {
            this.showMessage(false, error.error.errorMessage ? error.error.errorMessage : 'Ошибка!')
          }
        })
    }
  }

  loginUser() {
    if (this.password && this.password.valid) {
      let obj = {
        password: this.hr.encWithPubKey(String(this.password?.value), this.pubKey),
        identity: this.identity
      }
      this.authService.signIn(obj)

    } else {
      this.showMessage(false, '', 'Введите правилные данные', [])
    }
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  get username() {
    return this.formPhoneNumber.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

  get code() {
    return this.formSmsCode.get('code')
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }

}
