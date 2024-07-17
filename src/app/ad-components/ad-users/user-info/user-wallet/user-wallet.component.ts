import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {
  UserWalletBalanceDialogComponent
} from "../user-cards/user-wallet-balance-dialog/user-wallet-balance-dialog.component";
import {AdAgreeDialogComponent} from "../../../ad-agree-dialog/ad-agree-dialog.component";
import {HrService} from "../../../../ad-services/helper/hr.service";

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {
  @Input('id') userId!: string;
  loading: boolean = false
  dataList: Array<any> = []

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private hr:HrService
  ) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.getData()
    }
  }

  getData() {
    this.loading = true
    this.userService.userClientWalletList(this.userId).then((res: any) => {
      if (res) {
        this.dataList = res.wallets
        console.log(this.dataList)
        this.loading = false
      }
    })
  }
  openWalletDialog(){
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'хотите открыть кошелек ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.open(this.userId)
    })
  }
  reOpenWalletDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы точно хотите открыть заново ?'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.reopen(id, this.userId)
    })
  }
  open( userUuid: string){
    if (userUuid) {
      this.userService.userWalletOpen(userUuid).then((res:any)=>{
        if (res){
          this.hr.showMessage(true , res.message)
          this.getData()
        }
      })
    }
  }
  reopen(walletUuid: string, userUuid: string) {
    if (walletUuid && userUuid) {
      this.userService.userWalletReopen(walletUuid,userUuid).then((res:any)=>{
        if (res){
          this.hr.showMessage(true , res.message)
          this.getData()
        }
      })
    }
  }

  refreshBalance(ident: string) {
    if (this.userId) {
      this.userService.userClientWalletBalance(ident, this.userId).then((res: any) => {
        if (res) {
          this.dialog.open(UserWalletBalanceDialogComponent, {
            width: '500px',
            maxWidth: '500px',
            data: {
              ident,
              balance: res
            }
          })
        }
      })
    }
  }

  setWalletStatus(status: string): string {
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
