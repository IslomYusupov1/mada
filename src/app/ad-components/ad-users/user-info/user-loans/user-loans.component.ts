import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserLoanScheduleComponent} from "./user-loan-schedule/user-loan-schedule.component";

@Component({
  selector: 'app-user-loans',
  templateUrl: './user-loans.component.html',
  styleUrls: ['./user-loans.component.scss']
})
export class UserLoansComponent implements OnInit {
  @Input('id') userId!: string;
  loading: boolean = false
  dataList: Array<any> = []

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getData()
    }
  }


  getData() {
    this.loading = true
    this.userService.userClientLoansList(this.userId).then((res: any) => {
      if (res) {
        this.dataList = res.loans
        this.loading = false
      }
    })
  }

  openLoanScheduleDialog(id: number) {
    this.userService.getUserClientLoanSchedule({
      id: id,
      userUUID: this.userId
    }).then((res: any) => {
      if (res) {
        this.dialog.open(UserLoanScheduleComponent, {
          width: '900px',
          maxWidth: '900px',
          maxHeight: '700px',
          data: {
            list: res.schedule
          }
        })
      }
    })

  }

  setLoanStatus(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'Активный';
      case 'BLOCKED':
        return 'Заблокирован';
      default:
        return '???'
    }
  }
}
