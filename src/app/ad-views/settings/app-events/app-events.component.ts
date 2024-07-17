import {Component, OnInit} from '@angular/core';
import {PointService} from "../../../ad-services/point.service";
import {HrService} from "../../../ad-services/helper/hr.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

export interface IEventData {
  name: string;
  list: Array<IEventDataItem>;
}

export interface IEventDataItem {
  name: string;
  enable: boolean;
}

@Component({
  selector: 'app-app-events',
  templateUrl: './app-events.component.html',
  styleUrls: ['./app-events.component.scss']
})
export class AppEventsComponent implements OnInit {
  public loading: boolean = false
  public dataList: Array<IEventData> = []

  constructor(
    private pointService: PointService,
    private hrService: HrService,
    private router: Router,
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  public getData(): void {
    this.pointService.appEventsGet().then((res: any) => {
      if (res) {
        this.dataList = [
          {
            name: 'weather',
            list: res.weathers.sort(this.compareByName)
          },
          {
            name: 'icon',
            list: res.icons.sort(this.compareByName)
          },
          {
            name: 'season',
            list: res.seasons.sort(this.compareByName)
          },
          {
            name: 'holiday',
            list: res.holidays.sort(this.compareByName)
          },
        ]
      }
    })
  }

  public compareByName(a: IEventDataItem, b: IEventDataItem) {
    return a.name.localeCompare(b.name)
  }

  public changeEvent(event: any, parentName: string, name: string): void {
    const obj = {
      name,
      enable: event.checked
    }
    this.pointService.appEventsEdit(parentName, obj).then((res: any) => {
      if (res) {
        console.log(res)
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.getData()
      }
    })

  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
