import {Component, Input, OnInit} from '@angular/core';
import {TStatistics} from "../../../ad-views/state/state-monitoring/state-monitoring.component";

@Component({
  selector: 'app-state-statistics-card',
  templateUrl: './state-statistics-card.component.html',
  styleUrls: ['./state-statistics-card.component.scss']
})
export class StateStatisticsCardComponent implements OnInit {
  @Input() title!: string
  @Input() statData!: TStatistics

  constructor() { }

  ngOnInit(): void {
  }

}
