import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserCardBalanceDialogComponent} from "./user-card-balance-dialog/user-card-balance-dialog.component";

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss']
})
export class UserCardsComponent implements OnInit {
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
    this.userService.userClientCardList(this.userId).then((res: any) => {
      if (res) {
        this.dataList = res.cards
        this.loading = false
      }
    })
  }

  refreshBalance(id: number, maskPan: string) {
    if (this.userId) {
      this.userService.userClientCardBalance(id, this.userId).then((res: any) => {
        if (res) {
          this.dialog.open(UserCardBalanceDialogComponent, {
            width: '500px',
            maxWidth: '500px',
            data: {
              balance: res,
              maskedPan: maskPan
            }
          })
        }
      })
    }
  }

  setCardStatus(status: string): string {
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
