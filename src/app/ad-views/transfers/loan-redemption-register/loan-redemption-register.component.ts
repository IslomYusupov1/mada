import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HrService} from "../../../ad-services/helper/hr.service";
import {UserService} from "../../../ad-services/user.service";

@Component({
  selector: 'app-loan-redemption-register',
  templateUrl: './loan-redemption-register.component.html',
  styleUrls: ['./loan-redemption-register.component.scss']
})
export class LoanRedemptionRegisterComponent implements OnInit {
  yesterday: string = ''
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null)
  })

  constructor(
    private hrService: HrService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getMaxDate()
  }

  getMaxDate() {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    this.yesterday = this.hrService.reqFormatDate(today)
  }

  confirm() {
    if (this.dateForm.value.date) {
      const today = new Date()
      let inputValue = new Date(this.dateForm.value.date).setHours(today.getHours() + 1, today.getMinutes(), today.getSeconds())
      let time = new Date(inputValue)
      if (today > time) {
        this.userService.loanRedemptionRegister(this.dateForm.value.date).then((res: any) => {
          if (res) {
            this.hrService.showMessage(true, res.message)
          }
        })
      } else {
        this.hrService.showMessage(false, 'Введенная дата должна быть меньше, чем сегодня')
      }
    } else {
      this.hrService.showMessage(false, 'Введите дату!')
    }

    // if (this.dateForm.value.date) {
    //   let paymentDate = this.hrService.reqFormatDate(this.dateForm.value.date)
    //   console.log(paymentDate)
    // }
    // if (this.dateForm.value.date) {
    //   let paymentDate = this.hrService.reqFormatDate(this.dateForm.value.date)
    //   this.userService.loanRedemptionRegister(paymentDate).then((res: any) => {
    //     if (res) {
    //       this.hrService.showMessage(true, res.message)
    //     }
    //   })
    // }
  }

  refresh() {
    this.dateForm.patchValue({
      date: null
    })
  }
}
