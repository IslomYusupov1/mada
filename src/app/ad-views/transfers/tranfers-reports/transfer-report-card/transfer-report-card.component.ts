import {Component, Input, OnInit} from '@angular/core';

export interface ITransactionCount {
  transactionType: string,
  averageCount: number,
  averageSum: number,
  maxCount: number,
  maxSum: number,
  yesterdayCount: number,
  yesterdaySum: number,
  todayCount: number,
  todaySum: number,
  lastUpdated: string,
}

@Component({
  selector: 'app-transfer-report-card',
  templateUrl: './transfer-report-card.component.html',
  styles: [
  ]
})
export class TransferReportCardComponent implements OnInit {
  @Input() countInfo!: ITransactionCount

  constructor() { }

  ngOnInit(): void {
  }
}
