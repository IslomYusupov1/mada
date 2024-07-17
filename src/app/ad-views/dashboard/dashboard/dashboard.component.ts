import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {Chart, ChartConfiguration, ChartEvent, ChartType} from "chart.js";
import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  clientStatisticsList: any = {}
  statisticsShow: boolean = false

  graph = {
    label: [
      'Android',
      'Unknown',
      'iOS'
    ],
    data: [],
    colors: [
      'rgb(52,201,81)',
      'rgb(255,58,117)',
      'rgb(147,173,255)',
    ]
  }
  graph2 = {
    label: [
      'RED',
      'YELLOW',
      'GREEN'
    ],
    data: [],
    colors: [
      'rgb(239,14,32)',
      'rgb(241,202,10)',
      'rgb(14,225,18)',
    ]
  }

  chartData: ChartConfiguration['data'] = {
    // for Red pie data 300 bgColor rba(255, 99, 132)
    labels: this.graph.label,
    datasets: [{
      data: this.graph.data,
      backgroundColor: this.graph.colors,
      hoverOffset: 4
    }]
  };
  chartData2: ChartConfiguration['data'] = {
    // for Red pie data 300 bgColor rba(255, 99, 132)
    labels: this.graph2.label,
    datasets: [{
      data: this.graph2.data,
      backgroundColor: this.graph2.colors,
      hoverOffset: 3
    }]
  };

  chartType2: ChartType = 'doughnut';
  chartOptions: ChartConfiguration['options'] = {};
  chartType: ChartType = 'pie';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.getUserDboStatistics()
  }

  getUserDboStatistics() {
    this.userService.userDboStatistics().then((res: any) => {
      if (res) {
        this.clientStatisticsList = res
        let platform = res.platform
        let zone = res.zone
        let states = res.status
        platform.unknown = platform.web + platform.unknown
        for (let item in platform) {
          if (item != 'ussd' && item != 'web') {
            let data = platform[item]
            // @ts-ignore
            this.graph.data.push(data)

          }
        }
        for (let zones in zone) {
          let data2 = zone[zones]
          // @ts-ignore
          this.graph2.data.push(data2)
        }
        this.statisticsShow = true
      }
    })
  }

  public chartClicked({event, active,}: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
  }


  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
