import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../ad-services/user.service";
import {HrService} from "../../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {UserBankLimitAddComponent} from "../user-bank-limit-add/user-bank-limit-add.component";
import {UserBankLimitEditComponent} from "../user-bank-limit-edit/user-bank-limit-edit.component";
import {AdAgreeDialogComponent} from "../../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

export type TLimitAddRequest = {
  bankId: number,
  operationCode: string,
  operationType: string,
  periodType: string,
  amountLimit: number,
  countLimit: number,
  cardType: string
}

@Component({
  selector: 'app-user-bank-limit-one',
  templateUrl: './user-bank-limit-one.component.html',
  styles: []
})

export class UserBankLimitOneComponent implements OnInit {
  loadingList: boolean = false
  dataList: Array<any> = []
  cardTypesList: Array<string> = []
  operationTypesList: Array<string> = []
  periodTypesList: Array<string> = []
  bankId!: number
  bankName: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hrService: HrService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    if (!this.hrService.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.bankId = Number(param.id)
      }
    })
    this.bankName = `( ${this.route.snapshot.queryParams.bankName} )`
  }

  ngOnInit(): void {
    if (this.bankId) {
      this.getData()
      this.getLimitCardTypeList()
      this.operationList()
      this.periodList()
    }
  }

  getData(): void {
    this.loadingList = true
    this.userService.userBankTransactionLimitGet(this.bankId).then((res: any) => {
      if (res) {
        this.dataList = res.limits
        this.dataList.forEach((item, index) => {
          item.position = index + 1
        })
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
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

  operationList(): void {
    this.userService.operationTypeList().then((res: any) => {
      if (res) {
        this.operationTypesList = res.list
      } else {
        this.operationTypesList = []
      }
    })
  }

  periodList(): void {
    this.userService.vipUserPeriodList().then((res: any) => {
      if (res) {
        this.periodTypesList = res.list
      } else {
        this.periodTypesList = []
      }
    })
  }

  openAddLimitDialog() {
    let dialogRef = this.dialog.open(UserBankLimitAddComponent, {
      width: '650px',
      maxWidth: '650px',
      maxHeight: '750px',
      data: {
        operationTypeList: this.operationTypesList,
        cardTypeList: this.cardTypesList,
        periodTypeList: this.periodTypesList,
        bankId: this.bankId
      }
    })
    dialogRef.componentInstance.onAddLimit.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openEditLimitDialog(item: any) {
    let dialogRef = this.dialog.open(UserBankLimitEditComponent, {
      width: '650px',
      maxWidth: '650px',
      maxHeight: '750px',
      data: {
        item
      }
    })
    dialogRef.componentInstance.onEditLimit.subscribe(() => {
      dialogRef.close()
      this.getData()
    })
  }

  openDeleteDialog(id: number) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы действительно хотите удалить?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteLimit(id)
    })
  }

  deleteLimit(id: number) {
    this.userService.userBankTransactionLimitDelete(id).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно удален!')
        this.getData()
      }
    })
  }
}
