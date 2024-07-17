import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HrService} from "../../ad-services/helper/hr.service";

@Component({
  selector: 'app-ad-filter-buttons',
  templateUrl: './ad-filter-buttons.component.html',
  styleUrls: ['./ad-filter-buttons.component.scss']
})
export class AdFilterButtonsComponent implements OnInit, OnChanges {
  @Input() selectedBtn: any;
  @Output() time = new EventEmitter<any>()
  @Output() fromTime = new EventEmitter<any>()
  @Output() toTime = new EventEmitter<any>()

  yesterdayBtn: boolean = false
  todayBtn: boolean = false
  prevMonthBtn: boolean = false
  monthBtn: boolean = false
  settingsBtn: boolean = false
  showDateSettings: boolean = false
  from: string = ''
  to: string = ''

  constructor(
    private hrService: HrService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {selectedBtn} = changes
    if (selectedBtn && selectedBtn.currentValue) {
      if (selectedBtn.currentValue === 'allPeriod')
        this.to = ''
      this.from = ''
      this.showDateSettings = false
      this.setBtnStyle(selectedBtn.currentValue)
    }
  }

  setFilterDate(day: string) {
    let startDay = new Date()
    switch (day) {
      case "today":
        this.setBtnStyle("today")
        this.showDateSettings = false
        let startDate = new Date(new Date().setDate(startDay.getDate()))
        let startDateTime: Date = new Date(startDate.setHours(0, 0, 0))
        let endDateTime: Date = new Date(startDate.setHours(23, 59, 59))
        this.from = this.hrService.reqDataWithTime(startDateTime)
        this.to = this.hrService.reqDataWithTime(endDateTime)
        break;
      case "yesterday":
        this.setBtnStyle("yesterday")
        this.showDateSettings = false
        let startYesterday = new Date(new Date().setDate(startDay.getDate() - 1))
        let startYesterdayTime = new Date(startYesterday.setHours(0, 0, 0))
        let endYesterdayTime = new Date(startYesterday.setHours(23, 59, 59))
        this.from = this.hrService.reqDataWithTime(startYesterdayTime)
        this.to = this.hrService.reqDataWithTime(endYesterdayTime)
        break;
      case "prevMonth":
        this.setBtnStyle("prevMonth")
        this.showDateSettings = false
        let firstPrevMonthDay = new Date(startDay.getFullYear(), startDay.getMonth() - 1, 1)
        let lastPrevMonthDay = new Date(startDay.getFullYear(), startDay.getMonth(), 0)
        let firstPrevMonthDayTime = new Date(firstPrevMonthDay.setHours(0, 0, 0))
        let lastPrevMonthDayTime = new Date(lastPrevMonthDay.setHours(23, 59, 59))
        this.from = this.hrService.reqDataWithTime(firstPrevMonthDayTime)
        this.to = this.hrService.reqDataWithTime(lastPrevMonthDayTime)
        break;
      case "month":
        this.setBtnStyle("month")
        this.showDateSettings = false
        let firstDay = new Date(startDay.getFullYear(), startDay.getMonth(), 1)
        let to = new Date()
        let firstDayTime = new Date(firstDay.setHours(0, 0, 0))
        let toTime = new Date(to.setHours(23, 59, 59))
        this.from = this.hrService.reqDataWithTime(firstDayTime)
        this.to = this.hrService.reqDataWithTime(toTime)
        break;
      default:
        // this.setBtnStyle("")
        this.from = ''
        this.to = ''
        break;
    }

    this.time.emit({
      fromTime: this.from,
      toTime: this.to
    })
  }

  showSettings(btn: string) {
    this.setBtnStyle(btn)
    this.time.emit({
      fromTime: '',
      toTime: ''
    })
    this.showDateSettings = true
  }

  setBtnStyle(btn: string) {
    switch (btn) {
      case "today":
        this.todayBtn = true
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        break;
      case "yesterday":
        this.todayBtn = false
        this.yesterdayBtn = true
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        break;
      case "prevMonth":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = true
        this.monthBtn = false
        this.settingsBtn = false
        break;
      case "month":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = true
        this.settingsBtn = false
        break;
      case "settings":
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = true
        break;
      default:
        this.todayBtn = false
        this.yesterdayBtn = false
        this.prevMonthBtn = false
        this.monthBtn = false
        this.settingsBtn = false
        break;
    }
  }

  setFromTime(event: any) {
    if (event.target.value) {
      const from = new Date(event.target.value)
      const fromTime = new Date(from.setHours(0, 0, 0))
      this.from = this.hrService.reqDataWithTime(fromTime)
    } else {
      this.from = ''
    }
    this.fromTime.emit(this.from)
  }

  setToTime(event: any) {
    if (event.target.value) {
      const to = new Date(event.target.value)
      const toTime = new Date(to.setHours(23, 59, 59))
      this.to = this.hrService.reqDataWithTime(toTime)
    } else {
      this.to = ''
    }
    this.toTime.emit(this.to)
  }
}
