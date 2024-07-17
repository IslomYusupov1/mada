import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../ad-services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {
  SendNotificationDialogComponent
} from "../../../ad-components/ad-dialog/send-notification-dialog/send-notification-dialog.component";
import {UserService} from "../../../ad-services/user.service";
import {AdAgreeDialogComponent} from "../../../ad-components/ad-agree-dialog/ad-agree-dialog.component";
import {AdStatusDialogComponent} from "../../../ad-components/ad-status-dialog/ad-status-dialog.component";
import {Router} from "@angular/router";
import {
  CreateNotificationDialogComponent
} from "../../../ad-components/ad-dialog/create-notification-dialog/create-notification-dialog.component";
import {
  EditNotificationComponent
} from "../../../ad-components/ad-dialog/edit-notification/edit-notification.component";

@Component({
  selector: 'app-dashboard-notifications',
  templateUrl: './dashboard-notifications.component.html',
  styles: []
})
export class DashboardNotificationsComponent implements OnInit {
  dataList: Array<any> = []
  loadingList: boolean = false
  totalPages: number = 1
  currentPage: number = 1
  reqData: any = {
    isCritical: false,
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

  getList() {
    this.loadingList = true
    this.authService.notificationList(this.reqData).then((res: any) => {
      if (res) {
        this.dataList = res.content
        this.totalPages = res.paging.totalPages
        this.loadingList = false
      }
    })
  }

  senToUserNotificationDialog(id: string) {
    let dialogRef = this.dialog.open(SendNotificationDialogComponent, {
      maxWidth: '445px',
      width: '445px',
      data: {
        id: id,
      }
    });
    dialogRef.componentInstance.sendNotification.subscribe(() => {
      dialogRef.close()
    })
  }

  sendToAll(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '500px',
      width: '500px',
      data: {title: 'Вы точно хотите отправить всем пользователям это уведомление'}
    });
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.sendToAllNotification(id)
    })
  }

  sendToAllNotification(id: string) {
    this.userService.sendToAllUsers(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Уведомление успешно отправлено')
      }
    })
  }

  sendToHomePage(id: string) {
    this.userService.homeSend(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Уведомление успешно отправлено')
      }
    })
  }

  showMessage(status: boolean = false, title: string = '', description: string = '', list: Array<any> = []) {
    this.dialog.open(AdStatusDialogComponent, {
      data: {status, title, description, list},
      panelClass: 'status-mat-dialog'
    })
  }

  editDialog(id: string) {
    this.authService.notificationOne(id).then((res: any) => {
      if (res) {
        let dialogRef = this.dialog.open(EditNotificationComponent, {
          maxWidth: '950px',
          width: '950px',
          maxHeight: '650px',
          data: {
            id: id,
            data: res
          }
        });
        dialogRef.componentInstance.editNotification.subscribe(() => {
          dialogRef.close()
          this.getList()
        })
      }
    })
  }

  deleteDialog(id: string) {
    let dialogRef = this.dialog.open(AdAgreeDialogComponent, {
      maxWidth: '500px',
      width: '500px',
      data: {title: 'Вы точно хотите удалить это уведомление?'}
    })
    dialogRef.componentInstance.onAgree.subscribe(() => {
      dialogRef.close()
      this.deleteNotification(id)
    })
  }

  deleteNotification(id: string) {
    this.userService.deleteNotification(id).then((res: any) => {
      if (res) {
        this.showMessage(true, 'Успешно удален')
        this.getList()
      }
    })
  }

  pageClicked(val: number) {
    this.reqData.page = val - 1
    this.currentPage = val
    this.getList()
  }

  pagePrevTo() {
    this.reqData.page--
    this.currentPage--
    this.getList()
  }

  pageNextTo() {
    this.reqData.page++
    this.currentPage++
    this.getList()
  }

  get authToken(): String {
    let token = localStorage.getItem('token')
    return token ? token : ''
  }
}
