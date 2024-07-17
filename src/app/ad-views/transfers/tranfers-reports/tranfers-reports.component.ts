import { Component, OnInit } from '@angular/core';
import {PaynetService} from "../../../ad-services/paynet.service";
import {ITransactionCount} from "./transfer-report-card/transfer-report-card.component";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";

export interface ITotalCount {
  totalAverageCount: number,
  totalAverageSum: number,
  totalMaxCount: number,
  totalMaxSum: number,
  totalTodayCount: number,
  totalTodaySum: number,
  totalYesterdayCount: number,
  totalYesterdaySum: number,
  lastUpdated: string,
}

@Component({
  selector: 'app-tranfers-reports',
  templateUrl: './tranfers-reports.component.html',
  styleUrls: ['./tranfers-reports.component.scss']
})
export class TranfersReportsComponent implements OnInit {
  public totalCount!: ITotalCount
  public countList: Array<ITransactionCount> = []
  public loading: boolean = false

  constructor(
    private paymentService: PaynetService,
    private hrService: HrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.loading = true
    this.paymentService.transactionCountControlGet().then((res: any) => {
      if (res) {
        this.countList = res.countList
        this.totalCount = res.totalCount? res.totalCount : 0
        this.loading = false
      } else {
        this.loading = false
      }
    })
  }

  refreshData(): void {
    this.paymentService.transactionCountControlSync().then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Ваш запрос успешно отправлен!')
      }
    })
  }

  openRefreshDialog(): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы дествительно хотите обновить статистику ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(() =>{
      dialogRef.close()
      this.refreshData()
    })
  }
}
