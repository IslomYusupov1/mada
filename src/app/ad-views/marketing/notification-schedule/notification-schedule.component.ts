import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../ad-services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../ad-services/user.service";
import {
  CreateNotificationDialogComponent
} from "../../../ad-components/ad-dialog/create-notification-dialog/create-notification-dialog.component";
import {
  SendNotificationDialogComponent
} from "../../../ad-components/ad-dialog/send-notification-dialog/send-notification-dialog.component";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {
  EditNotificationComponent
} from "../../../ad-components/ad-dialog/edit-notification/edit-notification.component";
import {
  ScheduleQueeDialogComponent
} from "../../../ad-components/ad-dialog/schedule-quee-dialog/schedule-quee-dialog.component";

@Component({
  selector: 'app-notification-schedule',
  templateUrl: './notification-schedule.component.html',
  styles: []
})
export class NotificationScheduleComponent implements OnInit {
  activeState = 'topic';
  states = [
    {
      title: 'Список тем',
      value: 'topic'
    },
    {
      title: 'Список выбранных пользователей',
      value: 'choose'
    }
  ];
  dataList: Array<any> = []
  dataList1: Array<any> = []
  loadingList: boolean = false
  loadingList1: boolean = false
  totalPages: number = 1
  totalPages1: number = 1
  currentPage: number = 1
  currentPage1: number = 1
  reqData: any = {
    page: 0,
    size: 10
  }
  reqData1: any = {
    page: 0,
    size: 10
  }

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService
  ) {
    if (!this.authToken) {
      this.router.navigate(['/']).then(() => {
      })
    }
  }

  ngOnInit(): void {
    this.getList()
  }

  openCreateDialogNotification() {
    let createDialog = this.dialog.open(CreateNotificationDialogComponent, {
      maxWidth: '950px',
      width: '950px',
      maxHeight: '650px',
      data: {}
    });
    createDialog.componentInstance.createNotification.subscribe(() => {
      createDialog.close()
      this.getList()
    })
  }

  schedule(type: string) {
    this.activeState = type
    if (type === "topic") {
      this.getList()
    } else {
      this.chosenList()
    }
  }

  chosenList() {
    this.loadingList1 = true
    this.authService.chosenScheduleList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList1 = res.content
        this.totalPages1 = res.paging.totalPages
        this.loadingList1 = false
      }
    })
  }

  getList() {
    this.loadingList = true
    this.authService.topicScheduleList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  queueDetail(id: string) {
    this.userService.detailQueue(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(ScheduleQueeDialogComponent, {
          height: '600px',
          width: '900px',
          data: {
            queue: res,
          }
        });
        dialogRef.componentInstance.queue.subscribe(() => {
          dialogRef.close()
        })
      }
    })
  }

  stopSendUser(id: string, type: string) {
    if (type == 'topic') {
      let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
        maxWidth: '500px',
        width: '500px',
        data: {title: 'Вы точно хотите прекратить отправку'}
      });
      dialogRef.componentInstance.onAgree.subscribe(() => {
        dialogRef.close()
        this.stopTopic(id)
      })
    } else {
      let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
        maxWidth: '500px',
        width: '500px',
        data: {title: 'Вы точно хотите прекратить отправку'}
      });
      dialogRef.componentInstance.onAgree.subscribe(() => {
        dialogRef.close()
        this.stopChosen(id)
      })
    }
  }

  stopTopic(id: string) {
    this.userService.stopTopicSend(id).then((res: any) => {
      if (res) {
        this.showMessage(true, res.message)
        this.getList()
      }
    })
  }

  stopChosen(id: string) {
    this.userService.stopChosenSend(id).then((res: any) => {
      if (res) {
        this.showMessage(true, res.message)
        this.chosenList()
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pageClicked1(val: number) {
    this.reqData1.page = val - 1
    this.currentPage1 = val
    this.chosenList()
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pagePrevTo1() {
    this.reqData1.page--
    this.currentPage1--
    this.chosenList()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  pageNextTo1() {
    this.reqData1.page++
    this.currentPage1++
    this.chosenList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
