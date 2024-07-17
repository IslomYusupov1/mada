import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DepositPercentDialogComponent} from "./deposit-percent-dialog/deposit-percent-dialog.component";

@Component({
  selector: 'app-user-deposits',
  templateUrl: './user-deposits.component.html',
  styleUrls: ['./user-deposits.component.scss']
})
export class UserDepositsComponent implements OnInit {
  @Input('id') userId!: string;
  loading: boolean = false
  dataList: Array<any> = []

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      this.getData()
    }
  }

  getData() {
    this.loading = true
    this.userService.userClientDepositList(this.userId).then((res: any) => {
      if (res) {
        this.dataList = res.deposits
        this.loading = false
      }
    })
  }

  checkPercent(uuid: string): void {
    this.userService.depositPercentCheck(uuid).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(DepositPercentDialogComponent, {
          width: '400px',
          maxWidth: '400px',
          data: {
            percentAmount: res.percentAmount,
            uuid
          }
        })
        dialogRef.componentInstance.onWithdrawalPercent.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
      }
    })
  }

  setDepositStatus(status: string): string {
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
