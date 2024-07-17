import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HrService} from "../../../ad-services/helper/hr.service";
import {MatDialog} from "@angular/material/dialog";
import {PointService} from "../../../ad-services/point.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {
  ServiceControllerInactiveDialogComponent
} from "./service-controller-inactive-dialog/service-controller-inactive-dialog.component";
import {ServiceControllerDetailsComponent} from "./service-controller-details/service-controller-details.component";

interface IServiceControlData {
  position?: number;
  service: string;
  parentService: string;
  status: string;
  stopReason: string
}

@Component({
  selector: 'app-service-controller',
  templateUrl: './service-controller.component.html',
  styleUrls: ['./service-controller.component.scss']
})

export class ServiceControllerComponent implements OnInit {
  dataList: Array<IServiceControlData> = []
  loadingList: boolean = false

  constructor(
    private pointService: PointService,
    private dialog: MatDialog,
    private hrService: HrService,
    private router: Router
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.loadingList = true
    this.pointService.controlServiceGetList().then((res: Array<IServiceControlData>) => {
      if (res) {
        this.dataList = res
        this.dataList.forEach((item, index) => {
          item.position = index + 1
        })
        this.loadingList = false
      } else {
        this.dataList = []
        this.loadingList = false
      }
    }).catch((e)=>{
      this.dataList = []
      this.loadingList = false
    })
  }

  openActiveDialog(serviceName: string): void {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      data: {
        title: 'Вы точно хотите активировать этот сервис ?'
      }
    })
    dialogRef.componentInstance.onAgree.subscribe(()=>{
      dialogRef.close()
      this.activeService(serviceName)
    })
  }

  activeService(serviceName: string) {
    this.pointService.controlServiceActive(serviceName).then((res: any) => {
      if (res) {
        this.hrService.showMessage(true, res.message ? res.message : 'Успешно!')
        this.getData()
      }
    })
  }

  openInactiveDialog(serviceName: string) {
    let dialogRef = this.dialog.open(ServiceControllerInactiveDialogComponent, {
      width: '500px',
      maxWidth: '500px',
      data: {
        serviceName
      }
    })
    dialogRef.componentInstance.onInactive.subscribe(()=>{
      dialogRef.close()
      this.getData()
    })
  }

  openDetailsDialog(item: IServiceControlData) {
    this.dialog.open(ServiceControllerDetailsComponent, {
      width: '550px',
      maxWidth: '550px',
      data: {
        info: item
      }
    })
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
