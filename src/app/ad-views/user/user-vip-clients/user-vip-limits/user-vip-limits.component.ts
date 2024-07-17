import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../ad-services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {LimitDetailsComponent} from "./limit-details/limit-details.component";
import {
  CreateVipLimitDialogComponent
} from "../../../../ad-components/ad-users/vip-user/create-vip-limit-dialog/create-vip-limit-dialog.component";
import {Subscription} from "rxjs";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  EditVipLimitDialogComponent
} from "../../../../ad-components/ad-users/vip-user/edit-vip-limit-dialog/edit-vip-limit-dialog.component";

@Component({
  selector: 'app-user-vip-limits',
  templateUrl: './user-vip-limits.component.html',
  styleUrls: ['./user-vip-limits.component.scss']
})
export class UserVipLimitsComponent implements OnInit, OnDestroy {
  loadingList: boolean = false
  dataList: Array<any> = []
  bankList: Array<any> = []
  cardTypesList: Array<string> = []
  periodTypesList: Array<string> = []
  totalItems: number = 0
  totalPages: number = 1;
  currentPage: number = 1;
  operationTypes: Array<string> = []
  fullName: string = ''
  userId!: string
  private subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private hrService: HrService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams.id
    this.getData()
    this.getUserInfo()
    this.getBankList()
    this.getLimitCardTypeList()
    this.getOperationTypeList()
  }

  getData() {
    if (this.userId) {
      this.userService.vipUserLimits(this.userId).then((res: any) => {
        if (res) {
          this.dataList = res.list
        } else {
          this.dataList = []
        }
      })
    }
  }

  getBankList(): void {
    this.userService.userBankLimitBankList().then((res: any) => {
      if (res) {
        this.bankList = res.cardTypes
      } else {
        this.bankList = []
      }
    })
  }

  getLimitCardTypeList(): void {
    this.userService.userBankTransactionCardTypeList().then((res: any) => {
      if (res) {
        this.cardTypesList = res.cardTypes
      } else {
        this.cardTypesList = []
      }
    })
  }

  getUserInfo() {
    if (this.userId) {
      this.userService.userClientGetOne(this.userId).then((res: any) => {
        if (res) {
          this.fullName = `${res.firstName} ${res.lastName}`
        }
      })
    }
  }

  getOperationTypeList() {
    this.userService.operationTypeList().then((res: any) => {
      if (res) {
        this.operationTypes = res.list
      } else {
        this.operationTypes = []
      }
    })
  }

  openLimitDetailsDialog(item: any) {
    this.dialog.open(LimitDetailsComponent, {
      width: '600px',
      maxWidth: '600px',
      maxHeight: '800px',
      data: {
        item
      }
    })
  }

  showDeleteLimitDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      data: {title: 'Вы действительно хотите удалить?'}
    })
    const sub = dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.delete(id)
    })
    this.subscription.add(sub)
  }

  private delete(id: string) {
    this.userService.vipUserTransactionLimitDelete(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, 'Лимит транзакций успешно удален')
        this.getData()
      }
    })
  }

  openLimitCreateDialog() {
    this.userService.vipUserPeriodList().then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(CreateVipLimitDialogComponent, {
          width: '800px',
          maxWidth: '800px',
          maxHeight: '800px',
          data: {
            periods: res.list,
            types: this.operationTypes,
            userId: this.userId,
            cardTypes: this.cardTypesList,
            bankList: this.bankList
          }
        })
        const sub = dialogRef.componentInstance.onAddLimit.subscribe(() => {
          dialogRef.close()
          this.getData()
        })
        this.subscription.add(sub)
      }
    })
  }

  openLimitEditDialog(item: any) {
    let dialogRef = this.dialog.open(EditVipLimitDialogComponent, {
      width: '800px',
      maxWidth: '800px',
      maxHeight: '800px',
      data: {
        userId: this.userId,
        limitInfo: item
      }
    })
    const sub = dialogRef.componentInstance.onEditLimit.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
    this.subscription.add(sub)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
